<template>
  <div class="table-wrapper">
    <a-card :hoverable="true" :bordered="false">
      <div slot="title" class="flex flex-wrap">
        <div class="filter-wrapper">
          <span class="label">省份：</span>
          <a-input placeholder="省份模糊搜索" class="select-width" v-model="filterList.province" />
        </div>
        <div class="filter-wrapper" style="margin: 0 15px">
          <span class="label">筛选：</span>
          <a-cascader
            placeholder="请选择"
            style="width: 160px"
            :options="option"
            @change="upDateType"
            multiple
            placement="topRight"
            maxTagCount="responsive"
          />
        </div>
        <!-- <div class="filter-wrapper" style="margin: 0 15px">
          <span class="label">阶段：</span>
          <a-select placeholder="请选择阶段" class="select-width" allowClear @change="changeStage">
            <a-select-option v-for="item in stageOption" :key="item.key" :value="item.key">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        -->

        <a-button
          type="danger"
          icon="delete"
          style="margin: 0 16px 10px"
          :loading="deleteLoading"
          @click="batchDeleteTable"
        >
          批量删除
        </a-button>

        <a-button type="primary" icon="search" class="select-bottom" style="margin-right: 16px" @click="search">
          查询
        </a-button>
        <a-button type="primary" icon="export" class="select-bottom" :loading="exportLoading" @click="handleExport">
          导出
        </a-button>
      </div>

      <standard-table
        :tableData="tableData"
        :tableHead="tableHead"
        :loading="loading"
        :pagination="{
          pageSize: filterList.limit,
          current: filterList.page,
          total: filterList.total,
          showTotal: total => `${filterList.total} 条`
        }"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelect }"
        @changeCurrent="handleChangeCurrent"
      >
        <div slot="index" slot-scope="{ index }">
          {{ index + 1 }}
        </div>
        <div slot="money" slot-scope="{ text }">¥ {{ text }}</div>
        <div slot="action" slot-scope="{ text }">
          <a-button type="primary" size="small" @click="handleEdit(text)"> 编辑 </a-button>
          <a-popconfirm title="你确定要删除当前列吗?" ok-text="是" cancel-text="否" @confirm="handleDelete(text)">
            <a-button type="danger" size="small" style="margin-left: 8px"> 删除 </a-button>
          </a-popconfirm>
        </div>
      </standard-table>
    </a-card>

    <a-modal
      title="编辑"
      :visible="editShow"
      okText="确认"
      cancelText="取消"
      :width="620"
      @ok="handleOk"
      @cancel="editShow = false"
    >
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" hideRequiredMark>
        <a-form-model-item prop="year" label="年份">
          <a-input v-model="currentEdit.year" disabled />
        </a-form-model-item>
        <a-form-model-item prop="province" label="省份">
          <a-input v-model="currentEdit.province" disabled />
        </a-form-model-item>
        <a-form-model-item prop="stage" label="阶段">
          <a-input v-model="currentEdit.stage" disabled />
        </a-form-model-item>
        <a-form-model-item prop="avg" label="均分方式">
          <a-input v-model="currentEdit.avg" disabled />
        </a-form-model-item>
        <a-form-model-item prop="base" label="基础类型">
          <a-input v-model="currentEdit.base" disabled />
        </a-form-model-item>
        <a-form-model-item prop="pbValue" label="数值">
          <a-input v-model="currentEdit.pbValue" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import standardTable from '@/components/standardTable/index';
import { getTableData, deleteTable, batchDeleteTable, editTable } from '@/api/pbase';
import { formatJson } from '@/utils';
export default {
  name: 'tables',
  components: { standardTable },

  data() {
    return {
      value: [],
      option: [
        {
          value: '年份',
          label: '年份',
          children: [
            {
              value: '2011',
              label: '2011'
            },
            {
              value: '2012',
              label: '2012'
            },
            {
              value: '2013',
              label: '2013'
            },
            {
              value: '2014',
              label: '2014'
            },
            {
              value: '2015',
              label: '2015'
            },
            {
              value: '2016',
              label: '2016'
            },
            {
              value: '2017',
              label: '2017'
            },
            {
              value: '2018',
              label: '2018'
            },
            {
              value: '2019',
              label: '2019'
            },
            {
              value: '2020',
              label: '2020'
            }
          ]
        },
        {
          value: '阶段',
          label: '阶段',
          children: [
            {
              value: '小学',
              label: '小学'
            },
            {
              value: '初中',
              label: '初中'
            }
          ]
        },
        {
          value: '均分方式',
          label: '均分方式',
          children: [
            {
              value: '百生均',
              label: '百生均'
            },
            {
              value: '校均',
              label: '校均'
            }
          ]
        },
        {
          value: '基础类型',
          label: '基础类型',
          children: [
            {
              value: '学校数',
              label: '学校数'
            },
            {
              value: '学生数',
              label: '学生数'
            },
            {
              value: '计算机台数',
              label: '计算机台数'
            },
            {
              value: '平板数',
              label: '平板数'
            },
            {
              value: '多媒体教室数',
              label: '多媒体教室数'
            },
            {
              value: '微机室面积',
              label: '微机室面积'
            },
            {
              value: '信息老师数',
              label: '信息老师数'
            }
          ]
        }
      ],
      tableHead: [
        {
          title: '序号',
          dataIndex: 'index',
          scopedSlots: { customRender: 'index' },
          width: 60
        },
        {
          title: '年份',
          dataIndex: 'year',
          ellipsis: true
        },
        {
          title: '省份',
          dataIndex: 'province'
        },
        {
          title: '阶段',
          dataIndex: 'stage'
        },
        {
          title: '均分方式',
          dataIndex: 'avg',
          ellipsis: true
        },
        {
          title: '基础类型',
          dataIndex: 'base',
          scopedSlots: { customRender: 'base' }
        },
        {
          title: '数值',
          dataIndex: 'pbValue',
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          ellipsis: true
        },
        {
          title: '最后修改时间',
          dataIndex: 'gmtModified',
          ellipsis: true
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          width: 140
        }
      ],
      tableData: [],
      loading: false,
      selectedRowKeys: [],
      selectValue: [],
      currentEdit: {},
      editShow: false,
      filterList: {
        page: 1,
        limit: 15,
        total: 0,
        year: '',
        province: '',
        stage: '',
        avg: '',
        base: ''
      },
      deleteLoading: false,
      exportLoading: false
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleSelect(key, value) {
      this.selectedRowKeys = key;
      this.selectValue = value;
    },

    getTableData() {
      this.loading = true;
      const { page, limit, year, province, stage, avg, base } = this.filterList;
      getTableData({ page, limit, year, province, stage, avg, base }).then(res => {
        const data = res.data || {};
        this.filterList.total = data.total || 0;
        this.tableData = data.records || [];
        this.loading = false;
      });
    },

    upDateType(val) {
      console.log(val);
      this.filterList.year = val[0];
    },

    handleChangeCurrent(val) {
      this.filterList.page = val;
      this.getTableData();
    },

    search() {
      this.filterList.page = 1;
      this.getTableData();
    },

    handleEdit(val) {
      this.currentEdit = { ...val };
      this.editShow = true;
    },

    handleDelete(val) {
      const { id } = val;
      deleteTable({ id }).then(res => {
        this.getTableData();
        this.$message.success('删除成功');
      });
    },

    batchDeleteTable() {
      //模拟删除
      if (this.selectValue.length == 0) {
        this.$message.warning('请至少勾选一项');
        return;
      }
      this.deleteLoading = true;
      const batchId = this.selectValue.map(item => item.id).join(',');
      batchDeleteTable({ batchId }).then(res => {
        this.getTableData();
        this.$message.success('批量删除成功');
        this.deleteLoading = false;
      });
    },

    handleOk() {
      const { id, text } = this.currentEdit;
      editTable({ id, text }).then(res => {
        this.$message.success('修改成功！');
        this.editShow = false;
        this.getTableData();
      });
    },

    //导出
    handleExport() {
      //由于是前端导出，所以只能导出当前的页的15条数据
      this.exportLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const header = [],
          filterVal = [];
        this.tableHead.forEach(item => {
          if (item.title != '操作' && item.title != '序号') {
            header.push(item.title);
            filterVal.push(item.dataIndex);
          }
        });
        const data = formatJson(this.tableData, filterVal);

        excel.export_json_to_excel({
          header,
          data,
          filename: '表单统计'
        });
        this.exportLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .filter-wrapper {
    width: 230px;
    .label {
      min-width: 80px;
    }
    .select-width {
      width: 150px;
    }
  }
}
</style>
