<template>
  <div class="incoming-statistics">
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div
          slot="header"
          class="clearfix"
        >
          <span>进货据统计</span>
        </div>
        <!-- 面板内容 -->
        <span>时间：</span>
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
        >
        </el-date-picker>
        <el-select
          v-model="value"
          placeholder="进货情况统计"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
        >查询</el-button>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div
          id="stockForm"
          style="width: 900px;height:500px;margin-top:50px;"
        ></div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import echarts from "echarts";
console.log(echarts);
export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value7: "",
      options: [
        {
          value: "选项1",
          label: "销售情况统计"
        },
        {
          value: "选项2",
          label: "进货情况统计"
        }
      ],
      value: ""
    };
  },
  mounted() {
    var mychart = echarts.init(document.getElementById("stockForm"));

    var option = {
      title: {
        text: "出货统计"
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      tooltip: {},
      legend: {
        data: ["数量"]
      },
      xAxis: {
        data: ["1", "2", "3", "4", "5", "6", "8", "9", "10", "11", "12"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [
            5800,
            7936,
            9089,
            2386,
            4576,
            8976,
            9765,
            2455,
            9089,
            7654,
            6957,
            8654
          ]
        }
      ]
    };
    mychart.setOption(option);
  }
};
</script>

<style lang="less">
.incoming-statistics {
  flex: 1;
  // 主体
  .el-main {
    .el-card {
      .el-card__header {
        font-weight: 700;
        font-size: 15px;
        background-color: #f1f1f1;
      }
      .el-card__body {
        .el-date-editor {
          margin-right: 50px;
        }
        .el-input {
          width: 350px;
          margin-right: 50px;
        }
      }
    }
  }
}
</style>