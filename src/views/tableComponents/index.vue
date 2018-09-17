<template>
    <div class="h100 wrapper">
        <es-table
            ref="esTable"
            :tableObj="tableObj"
            @selectChangeFn="rowSelect"
            @btnFn="btnFn"
            @pageNumFn="pageNumFn"
            @inquireFn="inquireBtn"/>
    </div>
</template>

<script>
import esTable from '@/components/table';

export default {
    components: {
        esTable
    },
    data() {
        return {
            tableObj: {
                ths: this,
                isHasTitle: true, //是否拥有标题
                queryObj: {
                    title: '标题',
                    validItem: {//加入需要验证的选项
                        time: [
                            { required: true, message: '日期不能为空', trigger: 'blur' }
                        ],
                        checkboxObj:[
                            {required: true, message: '至少选择一个'}
                        ]
                    },
                    dictArr: {
                        select:[],
                        input_ico:'',
                        DateBegin:'',
                        DateEnd:'',
                        input:'',
                        chooseStr:'',
                        checkboxObj:[//多选
                            {
                                key:1,
                                value:1
                            },
                            {
                                key:2,
                                value:2
                            },
                            {
                                key:3,
                                value:3
                            },
                        ]
                    },
                    formArr: [
                        {
                            name: '下拉框',
                            type: 1,
                            key: 'select',
                            multiple:false
                        },
                        {
                            name:'输入框带图标',
                            type:0,
                            icon:'ios-search',
                            key:'input_ico'
                        },
                        {
                            name:'开始时间',
                            type:4,
                            key:'DateBegin'
                        },
                        {
                            name:'结束时间',
                            type:4,
                            key:'DateEnd'
                        },
                        {
                            name:'输入框',
                            type:0,
                            key:'input'
                        },
                        {
                            name:'多选框',
                            type:3,
                            key:'checkboxObj',
                            submitKey:'chooseStr'//在组件里处理为用逗号连接起来的字符串
                        }
                    ], //正常表单
                    formArrWidth: 140,
                    labelWidth: 105
                },
                tabObj: {
                    loading: false,//加载表格时是不是加入loading效果
                    title: '表格标题',
                    btnArr: [//按钮集合
                        {
                            name:'按钮1',
                            type:'default',
                            // disabled:true,//disabled属性来控制按钮是否可点击
                            fnType:'btn1',
                            poptip:'确认操作？'//用于二次确认
                        },
                        {
                            name:'按钮2',
                            type:'primary',
                            fnType:'btn2'
                        },
                        {
                            name:'按钮3',
                            type:'dashed',
                            fnType:'btn3'
                        },
                        {
                            name: '按钮4',
                            type: 'text',
                            fnType: 'export'
                        }
                    ],
                    columns: [
                        {
                            type: 'selection',
                            width: 60
                            // fixed: 'left',
                            // align: 'center'
                            //如果表格过宽，可以把selection左侧固定
                        },
                        {
                            title: 'Name',
                            ellipsis: true,
                            key: 'name'
                        },
                        {
                            title: 'Age',
                            key: 'age'
                        },
                        {
                            title:'Address',
                            key:'address'
                        }
                    ],
                    data: [],
                    pageObj: {//分页
                        total: 0,
                        pageNum: 1,
                        pageSize: 10
                    }
                }
            }
        };
    },
    props: [],
    watch: {},
    methods: {
        //加载表格数据
        loadTable(page){
            let ths = this
            let params = {//请求接口参数
                select:ths.$refs['esTable'].formItem.select,
                input_ico:ths.$refs['esTable'].formItem.input_ico,
                DateBegin:ths.$refs['esTable'].formItem.DateBegin,
                DateEnd:ths.$refs['esTable'].formItem.DateEnd,
                input:ths.$refs['esTable'].formItem.input,
                chooseStr:ths.$refs['esTable'].formItem.chooseStr,
                pageNum: page, 
                pageSize: ths.tableObj.tabObj.pageObj.pageSize
            }

            //给表格data设定固定值
            ths.tableObj.tabObj.data = [
                {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
            ]
        },
        /**
         * 查询按钮
         */
        inquireBtn(formItem){
            this.loadTable(1)
        },

        /**
         * 分页查询
         */
        pageNumFn(pageNum, pageSize, formItem) {
            this.loadTable(pageNum);
        },
        btnFn(obj){
            let ths = this;

            switch (obj.fnType) {
            case 'btn1':
                ths.btn1Fn()
                break;
            case 'btn2':
                ths.btn12Fn()
                break;
            case 'btn3':
                ths.btn3Fn()
                break;
            case 'btn4':
                ths.btn4Fn();
                break;
            }
        },
        btn1Fn(){
            //dosomething
        },
        btn12Fn(){
            //dosomething
        },
        btn3Fn(){
            //dosomething
        },
        btn4Fn(){
            //dosomething
        },
        //表格选择单个或者多个
        rowSelect(value){
            //dosomethint 表格选择
        },
    },
    mounted() {

    }
};
</script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;
    float: left;
    background: #fff;
    border-radius: 4px;
    padding: 14px;
    overflow-y: auto;
    overflow-x: hidden;
}

</style>
<style>

</style>
