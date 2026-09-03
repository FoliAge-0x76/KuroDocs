# 2-SAT

## 关键问题
给定 $n$ 组布尔方程，形如 $a\lor b$，求是否有解。若有解，输出方案。

1. 抽象。将每个布尔值 $a$ 拆分成 $a$ 与 $\lnot a$ 两个状态。
1. 对条件进行建图。例如 $a\lor b$ ，我们建立 $\lnot a\to b$ 和 $\lnot b\to a$ 。
1. 使用 Tarjan 算法找 SCC。若任意 $a$ 与 $\lnot a$ 位于同一 SCC，意味着无解，否则有解。
1. 输出方案。若 $a$ 所在 SCC 编号在 $\lnot a$ 之前时，取 $a$ ，否则取 $\lnot a$ 。

## 例题
#### 题面
给定 $n$ 对字符串 $l_i,r_i$ ，要求在每对字符串选择一个组成集合 $S$，且在此集合中，任意两个字符串不构成前缀关系。问是否有解。若有解输出答案。
#### 思路
首先构建 Trie，然后寻找布尔关系。

对同一个节点 $u$ 上代表的 $k$ 个字符串，我们使用链式约束，保证只会选中其中一个。对每个串，设：

- $s_i$ 代表第 $i$ 个字符串是否被选中，设其对应的另一个串为 $t_i$ 。
- $c_i$ 代表 $s_i$ 的前缀和。

那么有（若 $s_i=t_i$ 需要特判）：

- $s_i\lor t_i$
- $t_i \lor c_{u,i}$
- $t_i \lor \lnot c_{u,i-1}$
- $\lnot c_{u,i-1} \lor c_{u,i}$

若选择了一个 Trie 节点 $u$ 上的某个串，它的子树中的所有节点不能选择。于是我们对每个节点构造布尔变量：

- $x_u$ ，若 $u$ 的子树包含已选节点，$x_u$ 取真。

于是对 $u$ 任意儿子节点 $v$ 有以下规则：

- $\lnot c_{u,k}\lor\lnot x_v$
- $\lnot c_{u,k}\lor x_u$
- $\lnot x_v\lor x_u$

整理以上约束，我们需要建立的布尔节点：

- 每个串对的 $s_i$ 共 $n$ 个
- 每个节点的 $c_{u,i}$ 共 $2n$ 个
- 每个节点的儿子 $x_u$ 共 $|S|$ 个

对以上约束建图，进行 2-SAT 求解即可得到答案。

#### 实现
```cpp
struct TwoSAT{
	int head[N],to[N],nxt[N];
	int dfn[N],low[N];
	int dfncnt,st[N],pushed[N],top;
	int scc[N],sz[N],sc;
	int siz;
	// 多测默认，单测用1版本
	void init(int flag=0){
		if(flag){
			for(int i=0;i<N;++i) head[i]=-1;
			return;
		}
		cnt=0;sc=0;top=0;dfncnt=0;
		for(int i=0;i<=(siz<<1|1);++i){
			head[i]=-1;
			dfn[i]=0;
			low[i]=0;
			scc[i]=0;
			sz[i]=0;
		}
		siz=0;
	}

	void build(int u,int v){nxt[cnt]=head[u];head[u]=cnt;to[cnt++]=v;}

	void addClause(int l,int r,int notl,int notr){
		int ll=(l<<1)|notl;
		int rr=(r<<1)|notr;
		build(ll^1,rr);
		build(rr^1,ll);
		siz=max(siz,max(l,r));
	}

	void Tarjan(int u){
		low[u]=dfn[u]=++dfncnt;
		st[++top]=u;
		pushed[u]=1;
		for(int p=head[u];~p;p=nxt[p]){
			const int& v=to[p];
			if(!dfn[v]){
				Tarjan(v);
				low[u]=min(low[u],low[v]);
			}
			else if(pushed[v]){
				low[u]=min(low[u],dfn[v]);
			}
		}
		if(dfn[u]==low[u]){
			++sc;
			do{
				scc[st[top]]=sc;
				sz[sc]++;
				pushed[st[top]]=0;
			}while(st[top--]!=u);
		}
	}
	// 返回方案，若为空则无可行方案，下标从0开始
	string Solve(){
		for(int i=0;i<(siz<<1|1);++i){
			if(!dfn[i]) Tarjan(i);
		}
		string res,empty;
		for(int i=0;i<=siz;++i){
			if(scc[i<<1]==scc[i<<1|1]){
				return empty;
			}
			else res.push_back((scc[i<<1]<scc[i<<1|1])?'1':'0');
		}
		return res;
	}
}sat;
```