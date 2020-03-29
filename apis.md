1. 请求财务状况

```
GET req
{
    startDate: (int) //毫秒数，
    endDate: (int) //毫秒数
}

response
[
    {
        date: (int) //毫秒数，
        mount: (int) //钱的数量
    },
    ...
]
```

2. 请求病人情况

```
GET req
{
    startDate: int,
    endDate: int
}

response
[
    {
        date: (int),
        patient: {

        } 
    },
    ...
]
```

3. 请求员工信息

```
GET req
{
    startDate: int,
    endDate: int,
}

response
[
    {
        员工姓名,
        员工科室，
        员工部门，
        员工排班情况，
    },
    ...
]
```