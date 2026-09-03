# 欧拉函数
$\varphi(x)$ 定义为 $y\le x$ 且 $\gcd(x,y)=1$ 的 $y$ 数量。
## 基本性质

* Euler 分部求和

$$\sum_{d|n}\varphi(d)=n
$$

* 引理

$$\gcd(a,b)=\sum_{x|a,x|b}\varphi(x)$$
## 例题

来源：2026 HDU 多校第 6 场 F. Gcd Master

求

$$\sum_{i=1}^{n}\sum_{j=i}^{n}\sum_{k=i}^{j}\gcd(i,k)\gcd(j,k)\binom{j}{k}$$

#### 题解

首先设原函数为 $f(n)$ ，注意到

$$f(n)=f(n-1)+\sum_{i=1}^{n}\sum_{k=i}^{n}\gcd(i,k)\gcd(n,k)\binom{n}{k}$$

设增量为 $g(x)$ ，再注意到

$$
\begin{align*}
g(n)&=\sum_{i=1}^{n}\sum_{k=i}^{n}\gcd(i,k)\gcd(n,k)\binom{n}{k}\\
&=\sum_{k=1}^{n}\gcd(n,k)\binom{n}{k}\sum_{i=1}^{k}\gcd(i,k)
\end{align*}
$$

设

$$
\begin{align*}
a(n)&=\sum_{i=1}^{n}\gcd(i,n)\\
&=\sum_{i=1}^{n}\sum_{x|i,x|n}\varphi(x)\\
&=\sum_{x|n}\varphi(x)\sum_{i=1}^{n}[x|i]\\
&=\sum_{x|n}\varphi(x)\cdot\frac{n}{x}
\end{align*}
$$

枚举 $x$ ，我们可以在 $O(n\log n)$ 时间内处理出所有的 $a(n)$ 。于是原式变为：

$$
\begin{align*}
g(n)&=\sum_{k=1}^{n}\binom{n}{k}\gcd(n,k)a(k)\\
&=\sum_{k=1}^{n}\frac{n!\cdot a(k)}{k!(n-k)!}\sum_{x|k,x|n}\varphi(x)\\
&=n!\sum_{x|n}\varphi(x)\sum_{x|k}\frac{a(k)}{k!(n-k)!}
\end{align*}
$$

枚举 $x$ ，计算 

$$b_x(k)=\sum_{t=1}^{k}\frac{a(xt)}{(xt)!}\cdot\frac{1}{(x(k-t))!}$$

这是一个加法卷积，使用 NTT 加速可在 $O(n\log^2 n)$ 时间内计算完成。于是原函数变为：

$$
g(n)=n!\sum_{x|n}\varphi(x)b_x\left(\frac nx\right)
$$

$O(n\log n)$ 求出所有 $g(n)$ ，然后求前缀和即可得出答案。

总复杂度 $O(n\log^2 n)$ ，瓶颈在 NTT 。