
function quotaDic(quotaEn) {
  var quotaName = '未知'
    , quotaClass = 0    // [ 未知: 0, 监控状态: 1, 电机状态: 2, 告警: 3 ]
    , unitName = '单位'
  switch(quotaEn) {
  //监控状态
    case 'ent_air_pressure_pv': { quotaName = '空气入口压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'ent_air_pressure_sv': { quotaName = '空气入口压力SV', unitName = 'Mpa', quotaClass = 1 };break
    case 'air_flow_rate': { quotaName = '空气瞬时流量', unitName = 'Kg/h', quotaClass = 1 };break
    case 'air_flow_total': { quotaName = '空气累计流量', unitName = 'Kg', quotaClass = 1 };break

    case 'ent_oil_pressure_pv': { quotaName = '油入口压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'ent_oil_pressure_sv': { quotaName = '油入口压力SV', unitName = 'Mpa', quotaClass = 1 };break
    case 'oilpump_outlet_presssure_pv': { quotaName = '油出口压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'oilpump_outlet_presssure_sv': { quotaName = '油出口压力SV', unitName = 'Mpa', quotaClass = 1 };break
    case 'oil_flow_rate': { quotaName = '油瞬时流量', unitName = 'Kg/h', quotaClass = 1 };break
    case 'oil_flow_total': { quotaName = '油累计流量', unitName = 'Kg', quotaClass = 1 };break

    case 'ent_water_pressure_pv': { quotaName = '入口水压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'ent_water_pressure_sv': { quotaName = '入口水压力SV', unitName = 'Mpa', quotaClass = 1 };break
    case 'waterpump_outlet_pressure_pv': { quotaName = '出口水压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'waterpump_outlet_pressure_sv': { quotaName = '出口水压力SV', unitName = 'Mpa', quotaClass = 1 };break
    case 'water_flow_rate': { quotaName = '水瞬时流量', unitName = 'T/h', quotaClass = 1 };break
    case 'water_flow_total': { quotaName = '水累计流量', unitName = 'T', quotaClass = 1 };break

    case 'run_total_time_pv': { quotaName = '已运行时间PV', unitName = '小时', quotaClass = 1 };break
    case 'run_total_time_hour': { quotaName = '保养时间间隔', unitName = '小时', quotaClass = 1 };break

    case 'waterpump_pressure_pv': { quotaName = '燃烧室压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'rzt_temp_pv': { quotaName = '热载体温度PV', unitName = '度', quotaClass = 1 };break
    case 'rzt_temp_sv': { quotaName = '热载体温度SV', unitName = '度', quotaClass = 1 };break
    case 'rzt_pressure_pv': { quotaName = '热载体压力PV', unitName = 'Mpa', quotaClass = 1 };break
    case 'rzt_pressure_sv': { quotaName = '热载体压力SV', unitName = 'Mpa', quotaClass = 1 };break
    case 'cooling_water_temp_pv': { quotaName = '冷却水温度PV', unitName = '度', quotaClass = 1 };break
    case 'cooling_water_temp_sv': { quotaName = '冷却水温度SV', unitName = '度', quotaClass = 1 };break
    case 'krb_pv': { quotaName = '空燃比PV', unitName = '%', quotaClass = 1 };break
    case 'krb_sv': { quotaName = '空燃比SV', unitName = '%', quotaClass = 1 };break

    case 'oilpump_driver_temp': { quotaName = '油泵工作温度', unitName = '度', quotaClass = 1 };break
    case 'oilpump_inverter_pv': { quotaName = '油泵工作频率PV', unitName = 'HZ', quotaClass = 1 };break
    case 'oilpump_inverter_sv': { quotaName = '油泵工作频率SV', unitName = 'HZ', quotaClass = 1 };break
    case 'oilpump_interver_in': { quotaName = '油泵输入频率', unitName = 'HZ', quotaClass = 1 };break

    case 'waterpump_driver_temp_pv': { quotaName = '水泵工作温度PV', unitName = '度', quotaClass = 1 };break
    case 'waterpump_inverter_pv': { quotaName = '水泵工作频率PV', unitName = 'HZ', quotaClass = 1 };break
    case 'waterpump_inverter_sv': { quotaName = '水泵工作频率SV', unitName = 'HZ', quotaClass = 1 };break
    case 'waterpump_inverter_in': { quotaName = '水泵输入频率', unitName = 'HZ', quotaClass = 1 };break

    case 'tank_temp_pv': { quotaName = '加热水箱温度PV', unitName = '度', quotaClass = 1 };break
    case 'tank_temp_svl': { quotaName = '加热水箱温度SVL', unitName = '度', quotaClass = 1 };break
    case 'tank_temp_svh': { quotaName = '加热水箱温度SVH', unitName = '度', quotaClass = 1 };break
    case 'stop_bit_store': { quotaName = '相序正确开关', unitName = '', quotaClass = 1 };break

  //电机状态
    case 'ent_oil_value_start': { quotaName = '关闭阀', unitName = '', quotaClass = 2 };break
    case 'ent_oil_valve': { quotaName = '进原油，进柴油', unitName = '', quotaClass = 2 };break

    case 'waterpump_auto_manual': { quotaName = '水泵手自动', unitName = '', quotaClass = 2 };break
    case 'oilpump_auto_manual': { quotaName = '油泵手自动', unitName = '', quotaClass = 2 };break

    case 'pkf_position': { quotaName = '排空阀开度', unitName = '', quotaClass = 2 };break
    case 'pkf_close_in_postion': { quotaName = '排空阀状态位', unitName = '', quotaClass = 2 };break

    case 'pre_waterpump_status': { quotaName = '前置水泵状态位', unitName = '', quotaClass = 2 };break
    case 'waterpump_status': { quotaName = '水泵状态位', unitName = '', quotaClass = 2 };break
    case 'oilpump_status': { quotaName = '油泵状态位', unitName = '', quotaClass = 2 };break
    case 'dhq_status': { quotaName = '点火器启停状态', unitName = '', quotaClass = 2 };break
    case 'fan_status': { quotaName = '柜顶风扇启停状态', unitName = '', quotaClass = 2 };break

    case 'pkf_open_status': { quotaName = '排空阀启动位', unitName = '', quotaClass = 2 };break
    case 'pkf_close_status': { quotaName = '排空阀停止位', unitName = '', quotaClass = 2 };break
    case 'pkf_open_in_postion_status': { quotaName = '排空阀开到位', unitName = '', quotaClass = 2 };break
    case 'pkf_close_in_postion_status': { quotaName = '排空阀关到位', unitName = '', quotaClass = 2 };break

    case 'tank_auto_manual': { quotaName = '加热器手自动', unitName = '', quotaClass = 2 };break
    case 'heat1_status': { quotaName = '加热器1状态', unitName = '', quotaClass = 2 };break
    case 'heat2_status': { quotaName = '加热器2状态', unitName = '', quotaClass = 2 };break
    case 'heat3_status': { quotaName = '加热器3状态', unitName = '', quotaClass = 2 };break

  //告警
    case 'alarm_bit_store_0': { quotaName = '入口水压力高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_1': { quotaName = '入口油压力高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_2': { quotaName = '入口空气压力高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_3': { quotaName = '水泵出口压力高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_4': { quotaName = '油泵出口压力高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_5': { quotaName = '热载体压力高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_6': { quotaName = '热载体温度高报警', unitName = '', quotaClass = 3 };break
    case 'alarm_bit_store_7': { quotaName = '冷却水温度高报警', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_0': { quotaName = '入口水压力高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_1': { quotaName = '入口油压力高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_2': { quotaName = '入口空气压力高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_3': { quotaName = '水泵出口压力高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_4': { quotaName = '油泵出口压力高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_5': { quotaName = '热载体压力高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_6': { quotaName = '热载体温度高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_7': { quotaName = '冷却水温度高停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_8': { quotaName = '紧急停车', unitName = '', quotaClass = 3 };break
    case 'stop_bit_store_9': { quotaName = '相序错误', unitName = '', quotaClass = 3 };break
    case 'tank_level_alarm': { quotaName = '水箱液位低告警', unitName = '', quotaClass = 3 };break

    case 'system_time_stop': { quotaName = '设备维保时间到,请联系', unitName = '', quotaClass = 0 };break

    default: null
  }
  return {
    quotaName: quotaName,
    quotaClass: quotaClass,
    unitName: unitName,
  }
}

module.exports = quotaDic