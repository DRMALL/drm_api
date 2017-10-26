const arr = [
  // 监控状态  pkf_position
  { 'pkf_position': null, quotaName: '排空阀开度', unitName: '', quotaClass: 1 },
  { 'ent_air_pressure_pv': null, quotaName: '空气入口压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'ent_air_pressure_sv': null, quotaName: '空气入口压力SV', unitName: 'Mpa', quotaClass: 1 },
  { 'air_flow_rate': null, quotaName: '空气瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'air_flow_total': null, quotaName: '空气累计流量', unitName: 'Kg', quotaClass: 1 },

  { 'ent_oil_pressure_pv': null, quotaName: '油入口压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'ent_oil_pressure_sv': null, quotaName: '油入口压力SV', unitName: 'Mpa', quotaClass: 1 },
  { 'oilpump_outlet_presssure_pv': null, quotaName: '油出口压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'oilpump_outlet_presssure_sv': null, quotaName: '油出口压力SV', unitName: 'Mpa', quotaClass: 1 },
  { 'oil_flow_rate': null, quotaName: '油瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'oil_flow_total': null, quotaName: '油累计流量', unitName: 'Kg', quotaClass: 1 },

  { 'ent_water_pressure_pv': null, quotaName: '入口水压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'ent_water_pressure_sv': null, quotaName: '入口水压力SV', unitName: 'Mpa', quotaClass: 1 },
  { 'waterpump_outlet_pressure_pv': null, quotaName: '出口水压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'waterpump_outlet_pressure_sv': null, quotaName: '出口水压力SV', unitName: 'Mpa', quotaClass: 1 },
  { 'water_flow_rate': null, quotaName: '水瞬时流量', unitName: 'T/h', quotaClass: 1 },
  { 'water_flow_total': null, quotaName: '水累计流量', unitName: 'T', quotaClass: 1 },

  { 'run_total_time_pv': null, quotaName: '已运行时间PV', unitName: '小时', quotaClass: 1 },
  { 'run_total_time_hour': null, quotaName: '保养时间间隔', unitName: '小时', quotaClass: 1 },

  { 'waterpump_pressure_pv': null, quotaName: '燃烧室压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'rzt_temp_pv': null, quotaName: '热载体温度PV', unitName: '度', quotaClass: 1 },
  { 'rzt_temp_sv': null, quotaName: '热载体温度SV', unitName: '度', quotaClass: 1 },
  { 'rzt_pressure_pv': null, quotaName: '热载体压力PV', unitName: 'Mpa', quotaClass: 1 },
  { 'rzt_pressure_sv': null, quotaName: '热载体压力SV', unitName: 'Mpa', quotaClass: 1 },
  { 'cooling_water_temp_pv': null, quotaName: '冷却水温度PV', unitName: '度', quotaClass: 1 },
  { 'cooling_water_temp_sv': null, quotaName: '冷却水温度SV', unitName: '度', quotaClass: 1 },
  { 'krb_pv': null, quotaName: '空燃比PV', unitName: '%', quotaClass: 1 },
  { 'krb_sv': null, quotaName: '空燃比SV', unitName: '%', quotaClass: 1 },

  { 'oilpump_driver_temp': null, quotaName: '油泵工作温度', unitName: '度', quotaClass: 1 },
  { 'oilpump_inverter_pv': null, quotaName: '油泵工作频率PV', unitName: 'HZ', quotaClass: 1 },
  { 'oilpump_inverter_sv': null, quotaName: '油泵工作频率SV', unitName: 'HZ', quotaClass: 1 },
  { 'oilpump_interver_in': null, quotaName: '油泵输入频率', unitName: 'HZ', quotaClass: 1 },

  { 'waterpump_driver_temp_pv': null, quotaName: '水泵工作温度PV', unitName: '度', quotaClass: 1 },
  { 'waterpump_inverter_pv': null, quotaName: '水泵工作频率PV', unitName: 'HZ', quotaClass: 1 },
  { 'waterpump_inverter_sv': null, quotaName: '水泵工作频率SV', unitName: 'HZ', quotaClass: 1 },
  { 'waterpump_inverter_in': null, quotaName: '水泵输入频率', unitName: 'HZ', quotaClass: 1 },

  { 'tank_temp_pv': null, quotaName: '加热水箱温度PV', unitName: '度', quotaClass: 1 },
  { 'tank_temp_svl': null, quotaName: '加热水箱温度SVL', unitName: '度', quotaClass: 1 },
  { 'tank_temp_svh': null, quotaName: '加热水箱温度SVH', unitName: '度', quotaClass: 1 },

  // 新增监控状态
  { 'no1_airentrypress1': null, quotaName: '1号系统空气入口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_airentrypress1alarmvalue': null, quotaName: '1号系统空气入口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_airflue1': null, quotaName: '1号系统空气瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'no1_airflue1total': null, quotaName: '1号系统空气累计流量', unitName: 'Kg', quotaClass: 1 }, 
  { 'no1_gasentrypress1': null, quotaName: '1号系统燃气入口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_gasentrypress1alarmvalue': null, quotaName: '1号系统燃气入口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_gasexportpress': null, quotaName: '1号系统燃气出口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_gasflue1': null, quotaName: '1号系统燃气瞬时流量', unitName: 'Kg/h', quotaClass: 1 }, 
  { 'no1_gasflue1total': null, quotaName: '1号系统燃气累计流量', unitName: 'Kg', quotaClass: 1 },
  { 'no1_waterentrypress1': null, quotaName: '1号系统入口水压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_waterentrypress1alarmvalue': null, quotaName: '1号系统入口水压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_waterpumpexportpress1': null, quotaName: '1号系统出口水压力PV', unitName: 'MPa', quotaClass: 1 }, 
  { 'no1_watrepumpexportpress1alarmvalue': null, quotaName: '1号系统出口水压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_waterflux1': null, quotaName: '1号系统水瞬时流量', unitName: 'T/h', quotaClass: 1 },
  { 'no1_waterflux1total': null, quotaName: '1号系统水累计流量', unitName: 'T', quotaClass: 1 },
  { 'no1_No1_valve_Status': null, quotaName: '1号系统调节阀PV', unitName: '%', quotaClass: 1 },
  { 'no1_gasrange1_sv': null, quotaName: '1号系统调节阀SV', unitName: '%', quotaClass: 1 },
  { 'no1_gasrange1_in': null, quotaName: '1号系统调节阀IN', unitName: '%', quotaClass: 1 }, 
  { 'no1_heattemperature1': null, quotaName: '1号系统热载体温度PV', unitName: '℃', quotaClass: 1 },
  { 'no1_heattemperature1alarmvalue': null, quotaName: '1号系统热载体温度SV', unitName: '℃', quotaClass: 1 },
  { 'no1_heatpress1': null, quotaName: '1号系统热载体压力PV', unitName: 'MPa', quotaClass: 1 }, 
  { 'no1_heatpress1alarmvalue': null, quotaName: '1号系统热载体压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_cooltemperature1': null, quotaName: '1号系统冷却水温度PV', unitName: '℃', quotaClass: 1 },
  { 'no1_cooltemperature1alarmvalue': null, quotaName: '1号系统冷却水温度SV', unitName: '℃', quotaClass: 1 },
  { 'no1_krb1': null, quotaName: '1号系统空燃比PV', unitName: '', quotaClass: 1 },
  { 'no1_KRBset1': null, quotaName: '1号系统空燃比SV', unitName: '', quotaClass: 1 },    
  { 'no1_dangerousgas1': null, quotaName: '1号系统危险气体含量1', unitName: '%', quotaClass: 1 },
  { 'no1_dangerousgas2': null, quotaName: '1号系统危险气体含量2', unitName: '%', quotaClass: 1 },
  { 'no1_dangerousgas3': null, quotaName: '1号系统危险气体含量3', unitName: '%', quotaClass: 1 },
  { 'no1_powerairpress': null, quotaName: '1号系统动力气源压力', unitName: 'MPa', quotaClass: 1 },
  { 'no1_waterboxtemperature': null, quotaName: '1号系统加热水箱温度PV', unitName: '℃', quotaClass: 1 },
  { 'no1_waterboxtempsvH': null, quotaName: '1号系统加热水箱温度SVH', unitName: '℃', quotaClass: 1 },
  { 'no1_waterboxtempsvL': null, quotaName: '1号系统加热水箱温度SVL', unitName: '℃', quotaClass: 1 },
  { 'no2_airentrypress1': null, quotaName: '2号系统空气入口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_airentrypress1alarmvalue': null, quotaName: '2号系统空气入口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_airflue1': null, quotaName: '2号系统空气瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'no2_airflue1total': null, quotaName: '2号系统空气累计流量', unitName: 'Kg', quotaClass: 1 },
  { 'no2_gasentrypress1': null, quotaName: '2号系统燃气入口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_gasentrypress1alarmvalue': null, quotaName: '2号系统燃气入口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_gasexportpress': null, quotaName: '2号系统燃气出口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_gasflue1': null, quotaName: '2号系统燃气瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'no2_gasflue1total': null, quotaName: '2号系统燃气累计流量', unitName: 'Kg', quotaClass: 1 },
  { 'no2_waterentrypress1': null, quotaName: '2号系统入口水压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_waterentrypress1alarmvalue': null, quotaName: '2号系统入口水压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_waterpumpexportpress1': null, quotaName: '2号系统出口水压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_watrepumpexportpress1alarmvalue': null, quotaName: '2号系统出口水压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_waterflux1': null, quotaName: '2号系统水瞬时流量', unitName: 'T/h', quotaClass: 1 },
  { 'no2_waterflux1total': null, quotaName: '2号系统水累计流量', unitName: 'T', quotaClass: 1 },
  { 'no2_no2_valve_Status': null, quotaName: '2号系统调节阀PV', unitName: '%', quotaClass: 1 },
  { 'no2_gasrange1_sv': null, quotaName: '2号系统调节阀SV', unitName: '%', quotaClass: 1 },
  { 'no2_gasrange1_in': null, quotaName: '2号系统调节阀IN', unitName: '%', quotaClass: 1 },
  { 'no2_heattemperature1': null, quotaName: '2号系统热载体温度PV', unitName: '℃', quotaClass: 1 },
  { 'no2_heattemperature1alarmvalue': null, quotaName: '2号系统热载体温度SV', unitName: '℃', quotaClass: 1 },
  { 'no2_heatpress1': null, quotaName: '2号系统热载体压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_heatpress1alarmvalue': null, quotaName: '2号系统热载体压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_cooltemperature1': null, quotaName: '2号系统冷却水温度PV', unitName: '℃', quotaClass: 1 },
  { 'no2_cooltemperature1alarmvalue': null, quotaName: '2号系统冷却水温度SV', unitName: '℃', quotaClass: 1 },
  { 'no2_krb1': null, quotaName: '2号系统空燃比PV', unitName: '', quotaClass: 1 },
  { 'no2_KRBset1': null, quotaName: '2号系统空燃比SV', unitName: '', quotaClass: 1 },  
  { 'no2_dangerousgas1': null, quotaName: '2号系统危险气体含量1', unitName: '%', quotaClass: 1 },
  { 'no2_dangerousgas2': null, quotaName: '2号系统危险气体含量2', unitName: '%', quotaClass: 1 },
  { 'no2_dangerousgas3': null, quotaName: '2号系统危险气体含量3', unitName: '%', quotaClass: 1 },
  { 'no2_powerairpress': null, quotaName: '2号系统动力气源压力', unitName: 'MPa', quotaClass: 1 },
  { 'no2_waterboxtemperature': null, quotaName: '2号系统加热水箱温度PV', unitName: '℃', quotaClass: 1 },
  { 'no2_waterboxtempsvH': null, quotaName: '2号系统加热水箱温度SVH', unitName: '℃', quotaClass: 1 },
  { 'no2_waterboxtempsvL': null, quotaName: '2号系统加热水箱温度SVL', unitName: '℃', quotaClass: 1 },

  // 再次新增指标
  { 'no1_oilentrypress_pv': null, quotaName: '1号系统油入口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_oilentrypress_sv': null, quotaName: '1号系统油入口压力SV', unitName: 'MPa', quotaClass: 1 }, 
  { 'no1_oilexportpress_pv': null, quotaName: '1号系统油出口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_oilpump_outlet_sv': null, quotaName: '1号系统油出口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no1_oilflue1': null, quotaName: '1号系统油瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'no1_oilflue1total': null, quotaName: '1号系统油累计流量', unitName: 'Kg', quotaClass: 1 },
  { 'no1_oilpump_driver_t': null, quotaName: '1号系统油变频温度PV', unitName: '℃', quotaClass: 1 },    
  { 'no1_oilpump_feedback': null, quotaName: '1号系统油变频频率PV', unitName: 'HZ', quotaClass: 1 },
  { 'no1_waterpump_derver_t': null, quotaName: '1号系统水变频温度1-1', unitName: '℃', quotaClass: 1 },
  { 'no1_waterpump_feedback': null, quotaName: '1号系统水变频频率1-1', unitName: 'HZ', quotaClass: 1 },
  { 'no1_waterpump_driver_temp1': null, quotaName: '1号系统水变频温度1-2', unitName: '℃', quotaClass: 1 },
  { 'no1_ext_waterpump_feedback': null, quotaName: '1号系统水变频频率1-2', unitName: 'HZ', quotaClass: 1 },   
  { 'no2_oilentrypress_pv': null, quotaName: '2号系统油入口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_oilentrypress_sv': null, quotaName: '2号系统油入口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_oilexportpress_pv': null, quotaName: '2号系统油出口压力PV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_oilpump_outlet_sv': null, quotaName: '2号系统油出口压力SV', unitName: 'MPa', quotaClass: 1 },
  { 'no2_oilflue1': null, quotaName: '2号系统油瞬时流量', unitName: 'Kg/h', quotaClass: 1 },
  { 'no2_oilflue1total': null, quotaName: '2号系统油累计流量', unitName: 'Kg', quotaClass: 1 },
  { 'no2_oilpump_driver_t': null, quotaName: '2号系统油变频温度PV', unitName: '℃', quotaClass: 1 },
  { 'no2_oilpump_feedback': null, quotaName: '2号系统油变频频率PV', unitName: 'HZ', quotaClass: 1 },
  { 'no2_waterpump_derver_t': null, quotaName: '2号系统水变频温度2-1', unitName: '℃', quotaClass: 1 },
  { 'no2_waterpump_feedback': null, quotaName: '2号系统水变频频率2-1', unitName: 'HZ', quotaClass: 1 },
  { 'no2_waterpump_driver_temp1': null, quotaName: '2号系统水变频温度2-2', unitName: '℃', quotaClass: 1 },
  { 'no2_ext_waterpump_feedback': null, quotaName: '2号系统水变频频率2-2', unitName: 'HZ', quotaClass: 1 },
  { 'pressairepress': null, quotaName: '动力气源压力', unitName: 'MPa', quotaClass: 1 },

  // 电机状态
  { 'stop_bit_store': null, quotaName: '相序正确开关', unitName: '', quotaClass: 2 },
  { 'ent_oil_value_start': null, quotaName: '关闭阀', unitName: '', quotaClass: 2 },
  { 'ent_oil_valve': null, quotaName: '进原油，进柴油', unitName: '', quotaClass: 2 },
  { 'waterpump_auto_manual': null, quotaName: '水泵手自动', unitName: '', quotaClass: 2 },
  { 'oilpump_auto_manual': null, quotaName: '油泵手自动', unitName: '', quotaClass: 2 },
  { 'pkf_close_in_postion': null, quotaName: '排空阀状态位', unitName: '', quotaClass: 2 },
  { 'pre_waterpump_status': null, quotaName: '前置水泵状态位', unitName: '', quotaClass: 2 },
  { 'waterpump_status': null, quotaName: '水泵状态位', unitName: '', quotaClass: 2 },
  { 'oilpump_status': null, quotaName: '油泵状态位', unitName: '', quotaClass: 2 },
  { 'dhq_status': null, quotaName: '点火器启停状态', unitName: '', quotaClass: 2 },
  { 'fan_status': null, quotaName: '柜顶风扇启停状态', unitName: '', quotaClass: 2 },
  { 'pkf_open_status': null, quotaName: '排空阀启动位', unitName: '', quotaClass: 2 },
  { 'pkf_close_status': null, quotaName: '排空阀停止位', unitName: '', quotaClass: 2 },
  { 'pkf_open_in_postion_status': null, quotaName: '排空阀开到位', unitName: '', quotaClass: 2 },
  { 'pkf_close_in_postion_status': null, quotaName: '排空阀关到位', unitName: '', quotaClass: 2 },
  { 'tank_auto_manual': null, quotaName: '加热器手自动', unitName: '', quotaClass: 2 },
  { 'heat1_status': null, quotaName: '加热器1状态', unitName: '', quotaClass: 2 },
  { 'heat2_status': null, quotaName: '加热器2状态', unitName: '', quotaClass: 2 },
  { 'heat3_status': null, quotaName: '加热器3状态', unitName: '', quotaClass: 2 },

  // 新增电机状态
  { 'no1_uninstallvalve1JS': null, quotaName: '1号系统排空阀开度', unitName: '', quotaClass: 2 },
  { 'no1_s1valveAopenbit': null, quotaName: '1号系统气动球阀A状态', unitName: '', quotaClass: 2 }, 
  { 'no1_s1valveBopenbit': null, quotaName: '1号系统气动球阀B状态', unitName: '', quotaClass: 2 },
  { 'no1_fire1work': null, quotaName: '1号系统点火器状态', unitName: '', quotaClass: 2 },
  { 'no1_ph1': null, quotaName: '1号系统相序状态1', unitName: '', quotaClass: 2 },
  { 'no1_forntwaterpump1work': null, quotaName: '1号系统前置水泵状态', unitName: '', quotaClass: 2 },
  { 'no1_waterpump1work': null, quotaName: '1号系统水泵状态', unitName: '', quotaClass: 2 },
  { 'no1_uninstallvalve1openbit': null, quotaName: '1号系统排空阀开位', unitName: '', quotaClass: 2 },
  { 'no1_uninstallvalve1closebit': null, quotaName: '1号系统排空阀关位', unitName: '', quotaClass: 2 },
  { 'no2_s1valveAopenbit': null, quotaName: '2号系统气动球阀A状态', unitName: '', quotaClass: 2 },
  { 'no2_s1valveBopenbit': null, quotaName: '2号系统气动球阀B状态', unitName: '', quotaClass: 2 },
  { 'no2_fire1work': null, quotaName: '2号系统点火器状态', unitName: '', quotaClass: 2 },
  { 'no2_ph1': null, quotaName: '2号系统相序状态2', unitName: '', quotaClass: 2 },
  { 'no2_forntwaterpump1work': null, quotaName: '2号系统前置水泵状态', unitName: '', quotaClass: 2 },
  { 'no2_waterpump1work': null, quotaName: '2号系统水泵状态', unitName: '', quotaClass: 2 },
  { 'no2_uninstallvalve1openbit': null, quotaName: '2号系统排空阀开位', unitName: '', quotaClass: 2 },
  { 'no2_uninstallvalve1closebit': null, quotaName: '2号系统排空阀关位', unitName: '', quotaClass: 2 },

  // 再次添加电机状态 
  { 'no1_pre_waterpump_active': null, quotaName: '1号系统前置水泵状态1-1', unitName: '', quotaClass: 2 },
  { 'no1_waterpump_status_active': null, quotaName: '1号水泵状态1-1', unitName: '', quotaClass: 2 },
  { 'no1_pre_waterpump_active_12': null, quotaName: '1号系统前置水泵状态1-1', unitName: '', quotaClass: 2 },
  { 'no1_waterpump_status_active_12': null, quotaName: '1号水泵状态1-1', unitName: '', quotaClass: 2 },
  { 'no1_oilpump_status_active': null, quotaName: '1号系统油泵状态', unitName: '', quotaClass: 2 },  
  { 'no2_uninstallvalve1JS': null, quotaName: '2号系统排空阀开度', unitName: '', quotaClass: 2 },
  { 'no2_pre_waterpump_active': null, quotaName: '2号系统前置水泵状态2-1', unitName: '', quotaClass: 2 },
  { 'no2_waterpump_status_active': null, quotaName: '2号水泵状态2-1', unitName: '', quotaClass: 2 },
  { 'no2_pre_waterpump_active_12': null, quotaName: '2号系统前置水泵状态2-2', unitName: '', quotaClass: 2 },
  { 'no2_waterpump_status_active_12': null, quotaName: '2号水泵状态2-2', unitName: '', quotaClass: 2 },
  { 'no2_oilpump_status_active': null, quotaName: '2号系统油泵状态', unitName: '', quotaClass: 2 },

  // 告警
  { 'alarm_bit_store_0': null, quotaName: '入口水压力高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_1': null, quotaName: '入口油压力高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_2': null, quotaName: '入口空气压力高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_3': null, quotaName: '水泵出口压力高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_4': null, quotaName: '油泵出口压力高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_5': null, quotaName: '热载体压力高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_6': null, quotaName: '热载体温度高报警', unitName: '', quotaClass: 3 },
  { 'alarm_bit_store_7': null, quotaName: '冷却水温度高报警', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_0': null, quotaName: '入口水压力高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_1': null, quotaName: '入口油压力高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_2': null, quotaName: '入口空气压力高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_3': null, quotaName: '水泵出口压力高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_4': null, quotaName: '油泵出口压力高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_5': null, quotaName: '热载体压力高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_6': null, quotaName: '热载体温度高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_7': null, quotaName: '冷却水温度高停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_8': null, quotaName: '紧急停车', unitName: '', quotaClass: 3 },
  { 'stop_bit_store_9': null, quotaName: '相序错误', unitName: '', quotaClass: 3 },
  { 'tank_level_alarm': null, quotaName: '水箱液位低告警', unitName: '', quotaClass: 3 },
  { 'system_time_stop': null, quotaName: '设备维保时间到,请联系', unitName: '', quotaClass: 0 },

  // 新增告警  
  { 'dangerousgas1_alarm': null, quotaName: '危险气体报警1', unitName: '', quotaClass: 3 },
  { 'airentrypress1_alarm': null, quotaName: '空气入口压力1报警', unitName: '', quotaClass: 3 },
  { 'airentrypress1_stop': null, quotaName: '空气入口压力1停车', unitName: '', quotaClass: 3 },
  { 'airentrypress2_alarm': null, quotaName: '空气入口压力2报警', unitName: '', quotaClass: 3 },
  { 'airentrypress2_stop': null, quotaName: '空气入口压力2停车', unitName: '', quotaClass: 3 },
  { 'cooltemprature1_alarm': null, quotaName: '冷却水温度1报警', unitName: '', quotaClass: 3 },
  { 'cooltemprature2_stop': null, quotaName: '冷却水温度1停车', unitName: '', quotaClass: 3 },
  { 'cooltemprature2_alarm': null, quotaName: '冷却水温度2报警', unitName: '', quotaClass: 3 },
  { 'dangerousgas2_alarm': null, quotaName: '危险气体报警2', unitName: '', quotaClass: 3 },
  { 'dangerousgas3_alarm': null, quotaName: '危险气体报警3', unitName: '', quotaClass: 3 },
  { 'heattemprature1_alarm': null, quotaName: '热载体温度1报警', unitName: '', quotaClass: 3 },
  { 'heattemprature1_stop': null, quotaName: '热载体温度1停车', unitName: '', quotaClass: 3 },
  { 'heattemprature2_alarm': null, quotaName: '热载体温度2报警', unitName: '', quotaClass: 3 },
  { 'heattemprature2_stop': null, quotaName: '热载体温度2停车', unitName: '', quotaClass: 3 },
  { 'waterentrypress1_alarm': null, quotaName: '水入口压力1报警', unitName: '', quotaClass: 3 },
  { 'waterentrypress1_stop': null, quotaName: '水入口压力1停车', unitName: '', quotaClass: 3 },
  { 'waterentrypress2_alarm': null, quotaName: '水入口压力2报警', unitName: '', quotaClass: 3 },
  { 'waterentrypress2_stop': null, quotaName: '水入口压力2停车', unitName: '', quotaClass: 3 },
  { 'waterpumpexportpress1': null, quotaName: '水泵出口压力1报警', unitName: '', quotaClass: 3 },
  { 'waterpumpexportpress1_stop': null, quotaName: '水泵出口压力1停车', unitName: '', quotaClass: 3 },
  { 'waterpumpexportpress2_alarm': null, quotaName: '水泵出口压力2报警', unitName: '', quotaClass: 3 },
  { 'waterpumpexportpress2_stop': null, quotaName: '水泵出口压力2停车', unitName: '', quotaClass: 3 },
  { 'emergency1_stop': null, quotaName: '系统1急停已按下', unitName: '', quotaClass: 3 },
  { 'emergency2_stop': null, quotaName: '系统2急停已按下', unitName: '', quotaClass: 3 },
  { 'heatpress1_alarm': null, quotaName: '热载体压力1报警', unitName: '', quotaClass: 3 },
  { 'heatpress1_stop': null, quotaName: '热载体压力1停车', unitName: '', quotaClass: 3 },
  { 'heatpress2_alarm': null, quotaName: '热载体压力2报警', unitName: '', quotaClass: 3 },
  { 'heatpress2_stop': null, quotaName: '热载体压力2停车', unitName: '', quotaClass: 3 },
  { 'krb1L_alarm': null, quotaName: '一系统空燃比低报警', unitName: '', quotaClass: 3 },
  { 'krb1H_alarm': null, quotaName: '一系统空燃比高报警', unitName: '', quotaClass: 3 },
  { 'krb2H_alarm': null, quotaName: '二系统空燃比高报警', unitName: '', quotaClass: 3 },
  { 'krb2L_alarm': null, quotaName: '二系统空燃比低报警', unitName: '', quotaClass: 3 },
  { 'gasentrypress1_alarm': null, quotaName: '天然气入口压力1报警', unitName: '', quotaClass: 3 },
  { 'gasentrypress1_stop': null, quotaName: '天然气入口压力1停车', unitName: '', quotaClass: 3 },
  { 'gasentrypress2_alarm': null, quotaName: '天然气入口压力2报警', unitName: '', quotaClass: 3 },
  { 'gasentrypress2_stop': null, quotaName: '天然气入口压力2停车', unitName: '', quotaClass: 3 },
  { 'gasentrypress1_error': null, quotaName: '天然气入口1超量程', unitName: '', quotaClass: 3 },
  { 'gasentrypress2_error': null, quotaName: '天然气入口2超量程', unitName: '', quotaClass: 3 },
  { 'airentrypress1_error': null, quotaName: '空气入口1超量程', unitName: '', quotaClass: 3 },
  { 'airentrypress2_error': null, quotaName: '空气入口2超量程', unitName: '', quotaClass: 3 },
  { 'cooltemperature1_error': null, quotaName: '冷却水温度1超量程', unitName: '', quotaClass: 3 },
  { 'cooltemperature2_error': null, quotaName: '冷却水温度2超量程', unitName: '', quotaClass: 3 },
  { 'dangerousgas1_error': null, quotaName: '危险气体超量程', unitName: '', quotaClass: 3 },
  { 'heatpress1_error': null, quotaName: '热载体压力1超量程', unitName: '', quotaClass: 3 },
  { 'heatpress2_error': null, quotaName: '热载体压力2超量程', unitName: '', quotaClass: 3 },
  { 'heattemperature1_error': null, quotaName: '热载体温度1超量程', unitName: '', quotaClass: 3 },
  { 'heattemperature2_error': null, quotaName: '热载体温度2超量程', unitName: '', quotaClass: 3 },
  { 'waterpumpexportpress1': null, quotaName: '水泵出口压力1超量程', unitName: '', quotaClass: 3 },
  { 'waterpumpexportpress2': null, quotaName: '水泵出口压力2超量程', unitName: '', quotaClass: 3 },
  { 'heaterstop': null, quotaName: '加热水箱液位超低限', unitName: '', quotaClass: 3 },
  { 'temp1_alarm_h': null, quotaName: '1号系统热载体温度低于温度设定', unitName: '', quotaClass: 3 },
  { 'temp2_alarm_h': null, quotaName: '2号系统热载体温度低于温度设定', unitName: '', quotaClass: 3 },

  // 再次新增告警
  { 'system1_alarm_byte_0': null, quotaName: '1号系统水入口压力高报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_1': null, quotaName: '1号系统油入口压力高报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_2': null, quotaName: '1号系统空气入口压力报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_4': null, quotaName: '1号系统水泵出口压力高报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_5': null, quotaName: '1号系统油泵出口压力高报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_6': null, quotaName: '1号系统热载体压力高报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_7': null, quotaName: '1号系统热载体温度高报警', unitName: '', quotaClass: 3 },
  { 'system1_alarm_byte_8': null, quotaName: '1号系统冷却水温度高报警', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_0': null, quotaName: '1号系统水入口压力高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_1': null, quotaName: '1号系统油入口压力高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_2': null, quotaName: '1号系统空气入口压力高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_4': null, quotaName: '1号系统水泵出口压力高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_5': null, quotaName: '1号系统油泵出口压力高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_6': null, quotaName: '1号系统热载体压力高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_7': null, quotaName: '1号系统热载体温度高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_8': null, quotaName: '1号系统冷却水温度高停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_9': null, quotaName: '系统1紧急停车', unitName: '', quotaClass: 3 },
  { 'system1_stop_byte_10': null, quotaName: '系统相序错误', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_0': null, quotaName: '2号系统水入口压力高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_1': null, quotaName: '2号系统油入口压力高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_2': null, quotaName: '2号系统空气入口压力高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_4': null, quotaName: '2号系统水泵出口压力高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_5': null, quotaName: '2号系统油泵出口压力高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_6': null, quotaName: '2号系统热载体压力高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_7': null, quotaName: '2号系统热载体温度高报警', unitName: '', quotaClass: 3 },
  { 'system2_alarm_byte_8': null, quotaName: '2号系统冷却水温度高报警', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_0': null, quotaName: '2号系统水入口压力高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_1': null, quotaName: '2号系统油入口压力高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_2': null, quotaName: '2号系统空气入口压力高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_4': null, quotaName: '2号系统水泵出口压力高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_5': null, quotaName: '2号系统油泵出口压力高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_6': null, quotaName: '2号系统热载体压力高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_7': null, quotaName: '2号系统热载体温度高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_8': null, quotaName: '2号系统冷却水温度高停车', unitName: '', quotaClass: 3 },
  { 'system2_stop_byte_9': null, quotaName: '系统2紧急停车', unitName: '', quotaClass: 3 },
  { 'tank_low_alarm': null, quotaName: '水箱液位低报警', unitName: '', quotaClass: 3 },
]

function quotaDic(quotaEn) {
  let obj = {
    quotaName:'未知',
    quotaClass: 0,
    unitName: '单位' 
  }
  arr.map(item => {
    if (quotaEn == Object.keys(item)[0]) {
      obj.quotaName = item.quotaName
      obj.quotaClass = item.quotaClass
      obj.unitName = item.unitName
    }
  })

  return obj
}

module.exports.arr = arr 
module.exports.quotaDic = quotaDic





