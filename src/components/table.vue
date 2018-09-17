<template>
    <div class="table-parent">
        <div v-if="tableObj.queryObj" :class="{'table-search': true, 'table-search-line': !tableObj.queryObj.formAdvancedArr || !tableObj.queryObj.formAdvancedArr.length}">
            <h4 v-if="tableObj.queryObj.title" class="m-title" style="margin-bottom:14px">{{tableObj.queryObj.title}}</h4>
            <Form ref="formItem" :model="formItem" :rules="tableObj.queryObj.validItem" inline v-if="tableObj.queryObj" :label-width="labelWidth">
                <FormItem :label="item.name" :prop="item.key" class="esk-form-item" v-for="item in tableObj.queryObj.formArr" :key="item.key">
                    <div v-if="item.type===0" :style="{'width' : item.col ? (baseWidth+labelWidth+10)*(item.col-1)+baseWidth + 'px' : baseWidth + 'px'}">
                        <i-input v-model="formItem[item.key]" :icon="item.icon" @on-click="formClickFn(item.key)" :placeholder='item.placeholder'/>
                    </div>

                    <div v-else-if="item.type===1" :style="{'width' : item.col ? (baseWidth+labelWidth+10)*(item.col-1)+baseWidth + 'px' : baseWidth + 'px'}">
                        <Select v-if="item.multiple" v-model="formItem[item.key]" clearable multiple @on-change="formChangeFn(item.key,$event)">
                            <Option v-for="opt in tableObj.queryObj.dictArr[item.key]" :value="opt.key" :key="opt.key">{{ opt.value }}</Option>
                        </Select>
                        <Select v-if="!item.multiple" v-model="formItem[item.key]" clearable @on-change="formChangeFn(item.key)">
                            <Option v-for="opt in tableObj.queryObj.dictArr[item.key]" :value="opt.key" :key="opt.key">{{ opt.value }}</Option>
                        </Select>
                    </div>

                    <div v-else-if="item.type===2" :style="{'width' : item.col ? (baseWidth+labelWidth+10)*(item.col-1)+baseWidth + 'px' : baseWidth + 'px'}">
                        <RadioGroup v-model="formItem[item.key]"  @on-change="formChangeFn(item.key)">
                            <Radio v-for="opt in tableObj.queryObj.dictArr[item.key]" :label="opt.value" :key="opt.key"></Radio>
                        </RadioGroup>
                    </div>

                    <div v-else-if="item.type===3" :style="{'width' : item.col ? (baseWidth+labelWidth+10)*(item.col-1)+baseWidth + 'px' : baseWidth + 'px'}">
                        <CheckboxGroup v-model="formItem[item.key]"  @on-change="formChangeFn(item.key)">
                            <Checkbox v-for="opt in tableObj.queryObj.dictArr[item.key]" :label="opt.value" :key="opt.key"></Checkbox>
                        </CheckboxGroup>
                    </div>

                    <div v-else-if="item.type===4" :style="{'width' : item.col ? (baseWidth+labelWidth+10)*(item.col-1)+baseWidth + 'px' : baseWidth + 'px'}">
                        <DatePicker v-model="formItem[item.key]" :type="item.dateType" @on-change="formChangeFn(item.key,$event)" />
                    </div>

                    <div v-else-if="item.type===5" :style="{'width' : item.col ? (baseWidth+labelWidth+10)*(item.col-1)+baseWidth + 'px' : baseWidth + 'px'}">
                        <DatePicker format="yyyy-MM-dd" v-model="formItem[item.key]" type="daterange" @on-change="formChangeFn(item.key,$event)" style="width:100%"/>
                    </div>
                </FormItem>
            </Form>
            <div class="query-btn">
                <Button type="primary" @click="queryFn" :disabled="tableObj.tabObj.loading" style="margin-right:14px; width: 80px">{{ tableObj.tabObj.loading ? '查询中': '查询' }}</Button>
                <Button type="ghost" @click="handleReset()" style="width: 80px">重置</Button>
            </div>
        </div>
        <div class="table-wrapper">
            <div class="table-top" :class="{ 'has-title' : tableObj.tabObj.title && tableObj.tabObj.btnArr }">
                <h4 v-if="tableObj.tabObj.title" class="m-title">{{tableObj.tabObj.title}}</h4>
                <div :class="{ 'pull-right': tableObj.tabObj.title, 'text-right': !tableObj.tabObj.title}">
                    <template v-for="(item,index) in tableObj.tabObj.btnArr" v-if="tableObj.tabObj">
                        <Poptip v-if="item.poptip" confirm :title="item.poptip" @on-ok="btnFn(item.fnType)" :key="index" class="text-left">
                            <Button :type="item.type" style="margin-left:14px;" :disabled="item.disabled">{{item.name}}</Button>
                        </Poptip>
                        <Button v-if="!item.poptip" :type="item.type" style="margin-left:14px;" :key="index" :disabled="item.disabled" @click="btnFn(item.fnType)">{{item.name}}</Button>
                    </template>
                </div>
            </div>
            <Table :id="tableObj.tabObj.id" :ref="tableObj.tabObj.id ? tableObj.tabObj.id : 'table'" border highlight-row :height="tableHeight"
                :loading="tableObj.tabObj.loading"
                :columns="tableObj.tabObj.columns"
                :data="tableObj.tabObj.data"
                :row-class-name="rowClassName"
                @on-row-click="rowClick"
                @on-sort-change="sortChange"
                @on-select="rowSelect"
                @on-select-all="rowSelectAll"
                @on-selection-change="rowSelectChange"
                @on-current-change="handleChange">
            </Table>
        </div>
        <div ref="tablePager" class="table-page" v-show="tableObj.tabObj.pageObj.total>=0" v-if="tableObj.tabObj.pageObj">
            <Page v-if="tableObj.tabObj.pageType===2" :total="tableObj.tabObj.pageObj.total"
                simple
                :current="tableObj.tabObj.pageObj.pageNum"
                :page-size="tableObj.tabObj.pageObj.pageSize"
                @on-change="changePageNumFn">
            </Page>
            <Page v-else :total="tableObj.tabObj.pageObj.total"
                :current="tableObj.tabObj.pageObj.pageNum"
                :page-size="tableObj.tabObj.pageObj.pageSize"
                @on-change="changePageNumFn"
                @on-page-size-change="changePageSizeFn"
                show-total show-elevator show-sizer
                :page-size-opts="[10, 20, 50, 100, 200, 500]">
            </Page>
        </div>
    </div>
</template>

<script>



/*
 *表单类型：0-input、1-select、2-radio、3-checkbox、4-DatePicker、5-daterange
 */
export default {
    components:{
        
    },
    props: ['tableObj'],
    data() {
        return {
            labelWidth: 105,
            baseWidth: 140,
            tableHeight: 240,
            formItem: {},
            handleData: [],
            isShow: false,
            dateParams: []
        };
    },
    watch: {
        newValue(val,oVal) {
            const ths = this;

            if (val!==oVal) {
                ths.setFormWidth();
            }
        }
    },
    computed: {
        newValue() {
            const ths = this;

            if (ths.tableObj.queryObj) {
                return ths.tableObj.queryObj.formArrWidth;
            } else {
                return false;
            }
        }
    },
    created() {
        this.setFormWidth();
    },
    mounted() {
        let ths = this;

        ths.setTableHeight();
        if (window.jQuery) {
            // 用jQuery解决多个table组件时不能都自适应的bug
            window.jQuery(window).resize(()=>{
                ths.setTableHeight();
            });
        }
    },
    updated() {
        let ths = this;

        ths.setTableHeight();
    },
    methods: {
        // 设置表格高度
        setTableHeight() {
            let ths = this;
            let table = ths.$refs[ths.tableObj.tabObj.id || 'table'];
            let offsetTopInner = table ? table.$el.offsetTop : 0;
            let pageHeight = ths.$refs['tablePager'] ? ths.$refs['tablePager'].offsetHeight : 0;
            let offsetTopOuter = ths.tableObj.offsetTop || 0;
            let elseHeight = ths.tableObj.elseHeight || 0;

            ths.tableHeight = window.innerHeight - offsetTopInner - pageHeight - offsetTopOuter - 60 - elseHeight;
        },
        //设置form宽度
        setFormWidth () {
            const ths = this;

            if (ths.tableObj.queryObj) {
                ths.baseWidth = ths.tableObj.queryObj.formArrWidth || 140;
                ths.labelWidth = ths.tableObj.queryObj.labelWidth || 105;
            }
        },
        // 设置表单change事件
        formChangeFn(key,event) {
            let ths = this;

            if (event) {
                ths.formItem[key] = event;
            }
            ths.$emit(key + 'ChangeFn', ths.formItem[key]);
        },
        // 设置表单click事件
        formClickFn(key) {
            let ths = this;

            ths.$emit(key + 'ClickFn', ths.formItem[key]);
        },
        //table btn fnType---按钮功能类型
        btnFn(fnType){
            let ths = this, obj = {};

            obj.fnType = fnType;
            obj.handleData = ths.handleData;

            this.$emit('btnFn', obj);
        },
        //当表格的当前行发生变化的时候会触发
        handleChange(current){
            let ths = this;

            ths.handleData = [];
            ths.handleData.push(current);

            this.$emit('changeFn', current);
        },
        //单击某一行
        rowClick(row, index){
            this.$emit('clickFn', row);
        },
        //选中某一行
        rowSelect(selection, row){
            this.$emit('selectFn', row, selection);
        },
        //全选
        rowSelectAll(selection){
            this.$emit('selectAllFn', selection);
        },
        // 选择行发生改变
        rowSelectChange(selection){
            this.$emit('selectChangeFn', selection);
        },
        sortChange(column,key,order){
            this.$emit('sortFn', column, key,order);
        },
        //查询
        queryFn(){
            let ths = this;

            this.$refs['formItem'].validate((valid) => {
                if (valid) {
                    // 如果日期清掉了，要移除之前设置的日期参数
                    ths.dateParams.forEach(param=>{
                        if (ths.formItem[param] === null || (ths.formItem[param][0] === '' && ths.formItem[param][1] === '')) {
                            let arrKey = param.split('-');

                            delete ths.formItem[arrKey[0]];
                            delete ths.formItem[arrKey[1]];
                        }
                    });

                    for (let key in ths.formItem){
                        // 处理日期范围参数
                        if (key.indexOf('-') !== -1){
                            ths.dateParams.push(key);
                            let arrKey = key.split('-');

                            ths.formItem[key].forEach((val,index) => {
                                if (val) {
                                    ths.formItem[arrKey[index]] = ths.$moment(val).format('YYYY-MM-DD');
                                }
                            });
                        }

                        ths.tableObj.queryObj.formArr.forEach(item => {
                            // 处理单选参数
                            if (item.type === 2 && item.key === key) {
                                ths.tableObj.queryObj.dictArr[key].forEach(dict => {
                                    if (dict.value === ths.formItem[key]) {
                                        ths.formItem[item.submitKey] = dict.key;
                                    }
                                });
                            }
                            // 处理多选参数
                            if (item.type === 3 && item.key === key) {
                                let params = '';

                                ths.tableObj.queryObj.dictArr[key].forEach(dict => {
                                    ths.formItem[key].forEach(el => {
                                        if (dict.value === el) {
                                            params += (params === '' ? '' : ',') + dict.key;
                                        }
                                    });
                                });

                                ths.formItem[item.submitKey] = params;
                            }
                        });
                    }
                    ths.$emit('inquireFn', ths.formItem);
                }
            });
        },
        //重置
        handleReset(){
            let ths = this;

            if (ths.$refs.searchSelect) {
                for (let i=0;i<ths.$refs.searchSelect.length;i++) {
                    ths.$refs.searchSelect[i].resetFn();
                }
            }
            ths.formItem = {};
        },
        //切换页码
        changePageNumFn(pageNum){
            let ths = this, formItem, pageSize;

            formItem = ths.formItem;
            pageSize = ths.tableObj.tabObj.pageObj.pageSize;
            ths.tableObj.tabObj.pageObj.pageNum = pageNum;

            ths.$emit('pageNumFn',pageNum,pageSize,formItem);
        },
        //切换每页返回的条数数
        changePageSizeFn(pageSize){
            let ths = this;

            ths.tableObj.tabObj.pageObj.pageSize = pageSize;

            if (ths.tableObj.tabObj.pageObj.pageNum === 1) {
                ths.$emit('pageNumFn', 1, pageSize, ths.formItem);
            }
        },
        rowClassName(row, index) {
            let ths = this;

            if (ths.tableObj.tabObj.rowClassName) {
                return ths.tableObj.tabObj.rowClassName(row, index);
            }

            return '';
        }
    }
}
</script>

<style lang="scss" scoped>
.m-title {
    position: relative;
    padding-left: 14px;
    font-size: 14px;
    color: #666;
    font-weight: normal;
    line-height: 1;
    &::before {
        position: absolute;
        top: 3px;
        left: 0;
        content: '';
        width: 8px;
        height: 8px;
        background: #3B95E9;
    }
}
.table-parent {
    .table-search {
        padding-bottom: 14px;
        .query-btn {
            text-align: center;
            .advanced-search {
                position: relative;
                color: #2d8cf0;
                margin-right: 14px;
            }
        }
    }
    .table-search-line {
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 14px;
    }
    .table-wrapper {
        .table-top {
            margin-bottom: 14px;
            .m-title {
                display: inline;
            }
            &.has-title {
                height: 32px;
                line-height: 32px;
            }
        }
    }
    .table-page {
        text-align: right;
        margin-top: 14px;
    }
}
.esk-form-item {
    margin-bottom: 14px;
}

.AdSearch{
    margin-top: 14px;
    text-align: center;
    .AdSearchLine{
        width: calc( 50% - 55px );
        border-top: 1px #F2F2F2 solid;
    }
    .AdSearchBtn{
        cursor: pointer;
        width: 100px;
    }
    .deg180{
        transform: rotate(180deg);
        transition: transform 0.5s;
    }
    .deg0{
        transform: rotate(0deg);
        transition: transform 0.5s;
    }
    div{
        display: inline-block;
    }
}
</style>

<style>
.table-search .ivu-form-item-error-tip {
    padding-top: 3px;
}
.ivu-input-wrapper .ivu-icon{
    cursor: pointer;
}
</style>
