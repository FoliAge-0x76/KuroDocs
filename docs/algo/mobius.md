# Möbius 反演
莫反是由一个函数的容易计算的约数和倍数形式来反向统计该函数本身的算法。它的本质是容斥。
## Möbius 函数
$$[\gcd(x,y)=1]=\sum_{d|\gcd(x,y)}\mu(d)$$
## Möbius 反演
### 约数形式
若 $g(x)$ 是原函数 $f(x)$ 的约数形式

\[
g(n)=\sum_{d\mid n} f(d)
\]

则

\[
f(n)=\sum_{d\mid n} \mu(d)\,g\!\left(\frac{n}{d}\right)
\]

### 倍数形式
若 $F(x)$ 是原函数 $f(x)$ 的倍数形式

\[
F(n)=\sum_{n\mid d} f(d)
\]

则

\[
f(n)=\sum_{n\mid d} \mu\!\left(\frac{d}{n}\right) F(d)
\]

## 例题
### [[POI 2007] ZAP-Queries](https://www.luogu.com.cn/problem/P3455)

题意：统计 $\gcd(a,b)=k$ 的数对 $(a,b)$

令 

$$ f(x)=\sum [\gcd(a,b)=x]$$

我们知道它的倍数形式

$$ F(x)=\sum [x|\gcd(a,b)] $$

非常好求，只需要让 $a$ 和 $b$ 都是 $x$ 的倍数就行了，即 $F(x)=\lfloor n/x\rfloor\cdot\lfloor m/x\rfloor$ 。接下来由莫反可得

$$f(n)=\sum_{n\mid d} \mu\!\left(\frac{d}{n}\right) F(d)$$

我们数论分块去求这个和即可。

```cpp
// for(int i=2;i<=1000000;++i) mu[i]+=mu[i-1];
int solve(int n,int m,int k){
	n/=k;
	m/=k;
	int res=0;
	for(int i=1,j;i<=min(n,m);i=j+1){
		j=min(n/(n/i),m/(m/i));
		res+=(mu[j]-mu[i-1])*(n/i)*(m/i);
	}
	return res;
}
```
### [P2257 YY的GCD](https://www.luogu.com.cn/problem/P2257)

题意：统计 $\gcd(a,b)$ 为质数的数对 $(a,b)$

如果 $n$ 很小，我们可以遍历所有质数一个个统计。但是 $n$ 很大就需要进一步优化。

我们现在将原式化简为

$$\sum_{p\in prime}\sum_{p\mid x} \mu\!\left(\frac{x}{p}\right)\lfloor \frac{n}{x}\rfloor\lfloor \frac{m}{x}\rfloor$$

换序求和

$$\sum_{x=1}^{n} \lfloor \frac{n}{x}\rfloor\lfloor \frac{m}{x}\rfloor\sum_{p|x,p\in prime}\mu\!\left(\frac{x}{p}\right)$$

预处理后面的和，就可以解决本题。