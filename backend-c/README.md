# Tracer
## Build
```asm
git clone https://github.com/ipkn/crow
. ./env.sh
rm -rf build
mkdir build
cd build
brew 
```
## Desgin
1. server收到put请求，return ok. 解析json，交给parser，解析处理对应的对象，表，列的值，交给saver持久化
2. server收到get请求，解析对应的表，查询条件，取出数据返回。

