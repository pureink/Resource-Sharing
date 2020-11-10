def money(m):
    y = 0
    if m < 6:
        y=500
    elif 6<=m<=12:
        y=120*m
    else:
        y=180*m
    return y
def data(a,m):
    print('%s来了%d个月,获得奖金%d' %(a,m,money(m)))
data('大聪',14)