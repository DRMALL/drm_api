
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

    //新增监控状态
    case 'no1_airentrypress1': { quotaName = '1号系统空气入口压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_airentrypress1alarmvalue': { quotaName = '1号系统空气入口压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_airflue1': { quotaName = '1号系统空气瞬时流量', unitName = 'Kg/h', quotaClass = 1 };break
    case 'no1_airflue1total': { quotaName = '1号系统空气累计流量', unitName = 'Kg', quotaClass = 1 };break 
    case 'no1_gasentrypress1': { quotaName = '1号系统燃气入口压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_gasentrypress1alarmvalue': { quotaName = '1号系统燃气入口压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_gasexportpress': { quotaName = '1号系统燃气出口压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_gasflue1': { quotaName = '1号系统燃气瞬时流量', unitName = 'Kg/h', quotaClass = 1 };break 
    case 'no1_gasflue1total': { quotaName = '1号系统燃气累计流量', unitName = 'Kg', quotaClass = 1 };break
    case 'no1_waterentrypress1': { quotaName = '1号系统入口水压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_waterentrypress1alarmvalue': { quotaName = '1号系统入口水压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_waterpumpexportpress1': { quotaName = '1号系统出口水压力PV', unitName = 'MPa', quotaClass = 1 };break 
    case 'no1_watrepumpexportpress1alarmvalue': { quotaName = '1号系统出口水压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_waterflux1': { quotaName = '1号系统水瞬时流量', unitName = 'T/h', quotaClass = 1 };break
    case 'no1_waterflux1total': { quotaName = '1号系统水累计流量', unitName = 'T', quotaClass = 1 };break
    case 'no1_No1_valve_Status': { quotaName = '1号系统调节阀PV', unitName = '%', quotaClass = 1 };break
    case 'no1_gasrange1_sv': { quotaName = '1号系统调节阀SV', unitName = '%', quotaClass = 1 };break
    case 'no1_gasrange1_in': { quotaName = '1号系统调节阀IN', unitName = '%', quotaClass = 1 };break 
    case 'no1_uninstallvalve1JS': { quotaName = '1号系统排空阀开度', unitName = '', quotaClass = 1 };break
    case 'no1_heattemperature1': { quotaName = '1号系统热载体温度PV', unitName = '℃', quotaClass = 1 };break
    case 'no1_heattemperature1alarmvalue': { quotaName = '1号系统热载体温度SV', unitName = '℃', quotaClass = 1 };break
    case 'no1_heatpress1': { quotaName = '1号系统热载体压力PV', unitName = 'MPa', quotaClass = 1 };break 
    case 'no1_heatpress1alarmvalue': { quotaName = '1号系统热载体压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_cooltemperature1': { quotaName = '1号系统冷却水温度PV', unitName = '℃', quotaClass = 1 };break
    case 'no1_cooltemperature1alarmvalue': { quotaName = '1号系统冷却水温度SV', unitName = '℃', quotaClass = 1 };break
    case 'no1_krb1': { quotaName = '1号系统空燃比PV', unitName = '', quotaClass = 1 };break
    case 'no1_KRBset1': { quotaName = '1号系统空燃比SV', unitName = '', quotaClass = 1 };break    
    case 'no1_dangerousgas1': { quotaName = '1号系统危险气体含量1', unitName = '%', quotaClass = 1 };break
    case 'no1_dangerousgas2': { quotaName = '1号系统危险气体含量2', unitName = '%', quotaClass = 1 };break
    case 'no1_dangerousgas3': { quotaName = '1号系统危险气体含量3', unitName = '%', quotaClass = 1 };break
    case 'no1_powerairpress': { quotaName = '1号系统动力气源压力', unitName = 'MPa', quotaClass = 1 };break
    case 'no1_waterboxtemperature': { quotaName = '1号系统加热水箱温度PV', unitName = '℃', quotaClass = 1 };break
    case 'no1_waterboxtempsvH': { quotaName = '1号系统加热水箱温度SVH', unitName = '℃', quotaClass = 1 };break
    case 'no1_waterboxtempsvL': { quotaName = '1号系统加热水箱温度SVL', unitName = '℃', quotaClass = 1 };break
    case 'no2_airentrypress1': { quotaName = '2号系统空气入口压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_airentrypress1alarmvalue': { quotaName = '2号系统空气入口压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_airflue1': { quotaName = '2号系统空气瞬时流量', unitName = 'Kg/h', quotaClass = 1 };break
    case 'no2_airflue1total': { quotaName = '2号系统空气累计流量', unitName = 'Kg', quotaClass = 1 };break
    case 'no2_gasentrypress1': { quotaName = '2号系统燃气入口压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_gasentrypress1alarmvalue': { quotaName = '2号系统燃气入口压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_gasexportpress': { quotaName = '2号系统燃气出口压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_gasflue1': { quotaName = '2号系统燃气瞬时流量', unitName = 'Kg/h', quotaClass = 1 };break
    case 'no2_gasflue1total': { quotaName = '2号系统燃气累计流量', unitName = 'Kg', quotaClass = 1 };break
    case 'no2_waterentrypress1': { quotaName = '2号系统入口水压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_waterentrypress1alarmvalue': { quotaName = '2号系统入口水压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_waterpumpexportpress1': { quotaName = '2号系统出口水压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_watrepumpexportpress1alarmvalue': { quotaName = '2号系统出口水压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_waterflux1': { quotaName = '2号系统水瞬时流量', unitName = 'T/h', quotaClass = 1 };break
    case 'no2_waterflux1total': { quotaName = '2号系统水累计流量', unitName = 'T', quotaClass = 1 };break
    case 'no2_no2_valve_Status': { quotaName = '2号系统调节阀PV', unitName = '%', quotaClass = 1 };break
    case 'no2_gasrange1_sv': { quotaName = '2号系统调节阀SV', unitName = '%', quotaClass = 1 };break
    case 'no2_gasrange1_in': { quotaName = '2号系统调节阀IN', unitName = '%', quotaClass = 1 };break
    case 'no2_uninstallvalve1JS': { quotaName = '2号系统排空阀开度', unitName = '', quotaClass = 1 };break
    case 'no2_heattemperature1': { quotaName = '2号系统热载体温度PV', unitName = '℃', quotaClass = 1 };break
    case 'no2_heattemperature1alarmvalue': { quotaName = '2号系统热载体温度SV', unitName = '℃', quotaClass = 1 };break
    case 'no2_heatpress1': { quotaName = '2号系统热载体压力PV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_heatpress1alarmvalue': { quotaName = '2号系统热载体压力SV', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_cooltemperature1': { quotaName = '2号系统冷却水温度PV', unitName = '℃', quotaClass = 1 };break
    case 'no2_cooltemperature1alarmvalue': { quotaName = '2号系统冷却水温度SV', unitName = '℃', quotaClass = 1 };break
    case 'no2_krb1': { quotaName = '2号系统空燃比PV', unitName = '', quotaClass = 1 };break
    case 'no2_KRBset1': { quotaName = '2号系统空燃比SV', unitName = '', quotaClass = 1 };break  
    case 'no2_dangerousgas1': { quotaName = '2号系统危险气体含量1', unitName = '%', quotaClass = 1 };break
    case 'no2_dangerousgas2': { quotaName = '2号系统危险气体含量2', unitName = '%', quotaClass = 1 };break
    case 'no2_dangerousgas3': { quotaName = '2号系统危险气体含量3', unitName = '%', quotaClass = 1 };break
    case 'no2_powerairpress': { quotaName = '2号系统动力气源压力', unitName = 'MPa', quotaClass = 1 };break
    case 'no2_waterboxtemperature': { quotaName = '2号系统加热水箱温度PV', unitName = '℃', quotaClass = 1 };break
    case 'no2_waterboxtempsvH': { quotaName = '2号系统加热水箱温度SVH', unitName = '℃', quotaClass = 1 };break
    case 'no2_waterboxtempsvL': { quotaName = '2号系统加热水箱温度SVL', unitName = '℃', quotaClass = 1 };break

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

  //新增电机状态
    case 'no1_s1valveAopenbit': { quotaName = '1号系统气动球阀A状态', unitName = '', quotaClass = 2 };break 
    case 'no1_s1valveBopenbit': { quotaName = '1号系统气动球阀B状态', unitName = '', quotaClass = 2 };break
    case 'no1_fire1work': { quotaName = '1号系统点火器状态', unitName = '', quotaClass = 2 };break
    case 'no1_ph1': { quotaName = '1号系统相序状态1', unitName = '', quotaClass = 2 };break
    case 'no1_forntwaterpump1work': { quotaName = '1号系统前置水泵状态', unitName = '', quotaClass = 2 };break
    case 'no1_waterpump1work': { quotaName = '1号系统水泵状态', unitName = '', quotaClass = 2 };break
    case 'no1_uninstallvalve1openbit': { quotaName = '1号系统排空阀开位', unitName = '', quotaClass = 2 };break
    case 'no1_uninstallvalve1closebit': { quotaName = '1号系统排空阀关位', unitName = '', quotaClass = 2 };break
    case 'no2_s1valveAopenbit': { quotaName = '2号系统气动球阀A状态', unitName = '', quotaClass = 2 };break
    case 'no2_s1valveBopenbit': { quotaName = '2号系统气动球阀B状态', unitName = '', quotaClass = 2 };break
    case 'no2_fire1work': { quotaName = '2号系统点火器状态', unitName = '', quotaClass = 2 };break
    case 'no2_ph1': { quotaName = '2号系统相序状态2', unitName = '', quotaClass = 2 };break
    case 'no2_forntwaterpump1work': { quotaName = '2号系统前置水泵状态', unitName = '', quotaClass = 2 };break
    case 'no2_waterpump1work': { quotaName = '2号系统水泵状态', unitName = '', quotaClass = 2 };break
    case 'no2_uninstallvalve1openbit': { quotaName = '2号系统排空阀开位', unitName = '', quotaClass = 2 };break
    case 'no2_uninstallvalve1closebit': { quotaName = '2号系统排空阀关位', unitName = '', quotaClass = 2 };break

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

  // 新增告警  
    case 'dangerousgas1_alarm': { quotaName = '危险气体报警1', unitName = '', quotaClass = 3 };break
    case 'airentrypress1_alarm': { quotaName = '空气入口压力1报警', unitName = '', quotaClass = 3 };break
    case 'airentrypress1_stop': { quotaName = '空气入口压力1停车', unitName = '', quotaClass = 3 };break
    case 'airentrypress2_alarm': { quotaName = '空气入口压力2报警', unitName = '', quotaClass = 3 };break
    case 'airentrypress2_stop': { quotaName = '空气入口压力2停车', unitName = '', quotaClass = 3 };break
    case 'cooltemprature1_alarm': { quotaName = '冷却水温度1报警', unitName = '', quotaClass = 3 };break
    case 'cooltemprature2_stop': { quotaName = '冷却水温度1停车', unitName = '', quotaClass = 3 };break
    case 'cooltemprature2_alarm': { quotaName = '冷却水温度2报警', unitName = '', quotaClass = 3 };break
    case 'dangerousgas2_alarm': { quotaName = '危险气体报警2', unitName = '', quotaClass = 3 };break
    case 'dangerousgas3_alarm': { quotaName = '危险气体报警3', unitName = '', quotaClass = 3 };break
    case 'heattemprature1_alarm': { quotaName = '热载体温度1报警', unitName = '', quotaClass = 3 };break
    case 'heattemprature1_stop': { quotaName = '热载体温度1停车', unitName = '', quotaClass = 3 };break
    case 'heattemprature2_alarm': { quotaName = '热载体温度2报警', unitName = '', quotaClass = 3 };break
    case 'heattemprature2_stop': { quotaName = '热载体温度2停车', unitName = '', quotaClass = 3 };break
    case 'waterentrypress1_alarm': { quotaName = '水入口压力1报警', unitName = '', quotaClass = 3 };break
    case 'waterentrypress1_stop': { quotaName = '水入口压力1停车', unitName = '', quotaClass = 3 };break
    case 'waterentrypress2_alarm': { quotaName = '水入口压力2报警', unitName = '', quotaClass = 3 };break
    case 'waterentrypress2_stop': { quotaName = '水入口压力2停车', unitName = '', quotaClass = 3 };break
    case 'waterpumpexportpress1': { quotaName = '水泵出口压力1报警', unitName = '', quotaClass = 3 };break

    case 'waterpumpexportpress1_stop': { quotaName = '水泵出口压力1停车', unitName = '', quotaClass = 3 };break
    case 'waterpumpexportpress2_alarm': { quotaName = '水泵出口压力2报警', unitName = '', quotaClass = 3 };break
    case 'waterpumpexportpress2_stop': { quotaName = '水泵出口压力2停车', unitName = '', quotaClass = 3 };break
    case 'emergency1_stop': { quotaName = '系统1急停已按下', unitName = '', quotaClass = 3 };break
    case 'emergency2_stop': { quotaName = '系统2急停已按下', unitName = '', quotaClass = 3 };break
    case 'heatpress1_alarm': { quotaName = '热载体压力1报警', unitName = '', quotaClass = 3 };break
    case 'heatpress1_stop': { quotaName = '热载体压力1停车', unitName = '', quotaClass = 3 };break
    case 'heatpress2_alarm': { quotaName = '热载体压力2报警', unitName = '', quotaClass = 3 };break
    case 'heatpress2_stop': { quotaName = '热载体压力2停车', unitName = '', quotaClass = 3 };break
    case 'krb1L_alarm': { quotaName = '一系统空燃比低报警', unitName = '', quotaClass = 3 };break
    case 'krb1H_alarm': { quotaName = '一系统空燃比高报警', unitName = '', quotaClass = 3 };break
    case 'krb2H_alarm': { quotaName = '二系统空燃比高报警', unitName = '', quotaClass = 3 };break
    case 'krb2L_alarm': { quotaName = '二系统空燃比低报警', unitName = '', quotaClass = 3 };break
    case 'gasentrypress1_alarm': { quotaName = '天然气入口压力1报警', unitName = '', quotaClass = 3 };break
    case 'gasentrypress1_stop': { quotaName = '天然气入口压力1停车', unitName = '', quotaClass = 3 };break
    case 'gasentrypress2_alarm': { quotaName = '天然气入口压力2报警', unitName = '', quotaClass = 3 };break
    case 'gasentrypress2_stop': { quotaName = '天然气入口压力2停车', unitName = '', quotaClass = 3 };break
    case 'gasentrypress1_error': { quotaName = '天然气入口1超量程', unitName = '', quotaClass = 3 };break
    case 'gasentrypress2_error': { quotaName = '天然气入口2超量程', unitName = '', quotaClass = 3 };break
    case 'airentrypress1_error': { quotaName = '空气入口1超量程', unitName = '', quotaClass = 3 };break
    case 'airentrypress2_error': { quotaName = '空气入口2超量程', unitName = '', quotaClass = 3 };break
    case 'cooltemperature1_error': { quotaName = '冷却水温度1超量程', unitName = '', quotaClass = 3 };break
    case 'cooltemperature2_error': { quotaName = '冷却水温度2超量程', unitName = '', quotaClass = 3 };break
    case 'dangerousgas1_error': { quotaName = '危险气体超量程', unitName = '', quotaClass = 3 };break
    case 'heatpress1_error': { quotaName = '热载体压力1超量程', unitName = '', quotaClass = 3 };break
    case 'heatpress2_error': { quotaName = '热载体压力2超量程', unitName = '', quotaClass = 3 };break
    case 'heattemperature1_error': { quotaName = '热载体温度1超量程', unitName = '', quotaClass = 3 };break
    case 'heattemperature2_error': { quotaName = '热载体温度2超量程', unitName = '', quotaClass = 3 };break

    case 'waterpumpexportpress1': { quotaName = '水泵出口压力1超量程', unitName = '', quotaClass = 3 };break
    case 'waterpumpexportpress2': { quotaName = '水泵出口压力2超量程', unitName = '', quotaClass = 3 };break
    case 'heaterstop': { quotaName = '加热水箱液位超低限', unitName = '', quotaClass = 3 };break
    case 'temp1_alarm_h': { quotaName = '1号系统热载体温度低于温度设定', unitName = '', quotaClass = 3 };break
    case 'temp2_alarm_h': { quotaName = '2号系统热载体温度低于温度设定', unitName = '', quotaClass = 3 };break
    
    default: null
  }
  return {
    quotaName: quotaName,
    quotaClass: quotaClass,
    unitName: unitName,
  }
}

module.exports = quotaDic