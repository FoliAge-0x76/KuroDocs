# 卷积算法
卷积指的是一类对函数的二元运算 $f=g*h$ ，通过该运算可以利用两个已知函数生成一个新的函数。算法竞赛中，这些函数通常是多项式函数，以一个数组表示，其中 $f_i$ 代表 $x^i$ 项的常数。

## 快速傅里叶变换 FFT
FFT 用于 $O(n\log n)$ 时间解决加法卷积问题，即求

$$f_k=\sum_{i+j=k}g_i\cdot h_j$$

关于 FFT 的原理可以参考[这个视频](https://www.bilibili.com/video/BV1za411F76U)。

### 快速数论变换 NTT
NTT 是 FFT 在离散数学中的应用，通常在模 $998244353$ 的乘法群上进行。

??? "NTT 的 C++ 实现"

    ```cpp
    int r[N];
    void NTT(vector<int>& x,int lim,int opt=1){
        for(int i=0;i<lim;++i) if(r[i]<i) swap(x[i],x[r[i]]);
        for(int m=2;m<=lim;m<<=1){
            int k=m>>1;
            int gn=qPow(3,(mod-1)/m);
            for(int i=0;i<lim;i+=m){
                int g=1;
                for(int j=0;j<k;++j,g=g*gn%mod){
                    int tmp=x[i+j+k]*g%mod;
                    x[i+j+k]=(x[i+j]-tmp+mod)%mod;
                    x[i+j]=(x[i+j]+tmp)%mod;
                }
            }
        }
        if(opt==-1){
            reverse(x.begin()+1,x.begin()+lim);
            int inv=qinv(lim);
            for(int i=0;i<lim;++i) x[i]=x[i]*inv%mod;
        }
    }
    vector<int> conv_NTT(const vector<int>& A,const vector<int>& B,int need){
        int n=A.size(), m=B.size();
        int lim=1;
        while(lim<n+m-1) lim<<=1;
        for(int i=0;i<lim;++i){
            r[i]=(r[i>>1]>>1);
            if(i&1) r[i]|=(lim>>1);
        }
        vector<int> fa(lim,0),fb(lim,0);
        for(int i=0;i<n;++i) fa[i]=A[i];
        for(int i=0;i<m;++i) fb[i]=B[i];
        
        NTT(fa,lim,1);
        NTT(fb,lim,1);
        for(int i=0;i<lim;++i) fa[i]=fa[i]*fb[i]%mod;
        NTT(fa,lim,-1);
        fa.resize(min(need,n+m-1));
        return fa;
    }
    ```
## 快速沃尔什变换 FWT
FWT 是 FFT 的变体，用于 $O(n\log n)$ 时间解决三种位运算卷积问题，即求

$$f_k=\sum_{i\oplus j=k}g_i\cdot h_j$$

其中 $\oplus$ 是按位与、按位或、按位异或中的一种。

??? "FWT 的 C++ 实现"

    ```cpp
    void FWT(vector<int>& a,char op,int opt=1){
        int n=a.size();
        for(int len=2;len<=n;len<<=1){
            int half=len>>1;
            for(int i=0;i<n;i+=len){
                for(int j=0;j<half;++j){
                    int x=a[i+j];
                    int y=a[i+j+half];
                    if(opt==1){
                        if(op=='|') a[i+j+half]=(y+x)%mod;
                        if(op=='&') a[i+j]=(x+y)%mod;
                        if(op=='^') {
                            a[i+j]=(x+y)%mod;
                            a[i+j+half]=(x-y+mod)%mod;
                        }
                    }
                    else{
                        if(op=='|') a[i+j+half]=(y-x+mod)%mod;
                        if(op=='&') a[i+j]=(x-y+mod)%mod;
                        if(op=='^') {
                            a[i+j]=(x+y)*((mod+1)/2)%mod;
                            a[i+j+half]=(x-y+mod)*((mod+1)/2)%mod;
                        }
                    }
                }
            }
        }
    }
    vector<int> conv_FWT(const vector<int>& A,const vector<int>& B,char op) {
        int n=A.size(),m=B.size();
        int need=max(n,m);
        int lim=1;
        while(lim<need) lim<<=1;
        
        vector<int> fa(lim,0),fb(lim,0);
        for(int i=0;i<n;++i) fa[i]=A[i];
        for(int i=0;i<m;++i) fb[i]=B[i];
        
        FWT(fa,op,1);
        FWT(fb,op,1);
        for(int i=0;i<lim;++i) fa[i]=fa[i]*fb[i]%mod;
        FWT(fa,op,-1);
        
        return fa;
    }
    ```