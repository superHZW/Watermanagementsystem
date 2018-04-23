-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 04 月 23 日 10:50
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `watermanage`
--

-- --------------------------------------------------------

--
-- 表的结构 `prj_gd_b`
--

CREATE TABLE IF NOT EXISTS `prj_gd_b` (
  `GD_CD` int(32) NOT NULL AUTO_INCREMENT COMMENT '管道代码',
  `GD_NM` varchar(50) NOT NULL COMMENT '管道名称',
  `OBJ_CD` varchar(32) NOT NULL COMMENT '对象编码',
  `BEGIN_NODE_CD` int(32) NOT NULL COMMENT '起点节点编号',
  `END_NODE_CD` int(32) NOT NULL COMMENT '终点节点编号',
  `BEGIN_STAKE_MARK` varchar(32) NOT NULL COMMENT '起点桩号',
  `END_STAKE_MARK` varchar(32) NOT NULL COMMENT '终点桩号',
  `IN_HIGHT` double NOT NULL COMMENT '进口底高程（m）',
  `OUT_HIGHT` double NOT NULL COMMENT '出口底高程（m）',
  `GD_MATE` varchar(1) NOT NULL COMMENT '管材',
  `GD_SIZE` double NOT NULL COMMENT '内径（mm）',
  `GD_THICK` double NOT NULL COMMENT '壁厚',
  `SLOPE` double NOT NULL COMMENT '坡度',
  `GD_LENGH` double NOT NULL COMMENT '长度（m）',
  `SHAPE` varchar(1) NOT NULL COMMENT '断面形状',
  `SLBJ` double NOT NULL COMMENT '水力半径（m）',
  `ROUGHNESS` double NOT NULL COMMENT '糙率',
  `YCXS` double NOT NULL COMMENT '沿程系数',
  `V` double NOT NULL COMMENT '设计流速（m3/s）',
  `YCSS` double NOT NULL COMMENT '沿程损失',
  `TJTXML` double NOT NULL COMMENT '体积弹性模量',
  `Q` double NOT NULL COMMENT '设计流量（m3/s）',
  `MP` float NOT NULL COMMENT '设计压力标高（m）',
  `SCBS` double NOT NULL COMMENT '水锤波速',
  `CYDJ` double NOT NULL COMMENT '承压等级(MPa)',
  `QHYL` double NOT NULL COMMENT '汽化压力（MPa）',
  `xyz` blob NOT NULL COMMENT '内点',
  `NS` int(3) NOT NULL COMMENT '段数',
  `SJQ` double NOT NULL COMMENT '初始流量',
  `RESULT_Q` double NOT NULL COMMENT '稳定计算结果',
  `B` double NOT NULL,
  `R` double NOT NULL,
  `NT` varchar(500) NOT NULL COMMENT '备注',
  PRIMARY KEY (`GD_CD`),
  UNIQUE KEY `GD_CD` (`GD_CD`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管道基础信息表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `prj_intakesump_b`
--

CREATE TABLE IF NOT EXISTS `prj_intakesump_b` (
  `CNW_CD` int(32) NOT NULL AUTO_INCREMENT COMMENT '进水池编码',
  `NODE_CD` int(32) NOT NULL COMMENT '节点编码',
  `CNW_NM` varchar(50) NOT NULL COMMENT '名称',
  `OBJ_CD` varchar(32) NOT NULL COMMENT '对象编码',
  `LGTD` double NOT NULL COMMENT '经度',
  `LTTD` double NOT NULL COMMENT '纬度',
  `Q` double NOT NULL COMMENT '设计流量',
  `PIPE_SIZE` double NOT NULL COMMENT '出水池水位',
  `PIPE_C` int(2) NOT NULL COMMENT '水管直径',
  `MP` double NOT NULL COMMENT '水管根数',
  `SZFD` enum('1','2','3','4','0') NOT NULL COMMENT '所在分段（1-一段，2-二段，3-三段，4-四段，0-其他）',
  `Z` double NOT NULL COMMENT '从实时水位表获取的水位高程',
  `NT` varchar(500) NOT NULL COMMENT '备注',
  PRIMARY KEY (`CNW_CD`),
  UNIQUE KEY `CNW_CD` (`CNW_CD`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='进水池基础信息表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `prj_node_b`
--

CREATE TABLE IF NOT EXISTS `prj_node_b` (
  `NODE_CD` int(32) NOT NULL AUTO_INCREMENT COMMENT '节点编码',
  `NODE_NM` varchar(50) NOT NULL COMMENT '节点名称',
  `OBJ_CD` varchar(32) DEFAULT NULL COMMENT '对象编码',
  `CNW_CD` int(32) DEFAULT NULL COMMENT '设备编码',
  `CNW_NM` varchar(100) DEFAULT NULL COMMENT '设备名称',
  `HEIGHT` double DEFAULT NULL COMMENT '高程',
  `QHYL` double DEFAULT NULL COMMENT '汽化压力',
  `MP` double DEFAULT NULL COMMENT '压力',
  `Q` double DEFAULT NULL COMMENT '流量',
  `SZFD` enum('1','2','3','4','0') DEFAULT NULL COMMENT '所在分段（1-一段，2-二段，3-三段，4-四段，0-其他）',
  `LGTD` double DEFAULT NULL COMMENT '经度',
  `LTTD` double DEFAULT NULL COMMENT '纬度',
  `RESULT_H` double DEFAULT NULL COMMENT '计算结果中的压力（水力）',
  `NT` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`NODE_CD`),
  UNIQUE KEY `NODE_CD` (`NODE_CD`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='节点' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `prj_out_pool_b`
--

CREATE TABLE IF NOT EXISTS `prj_out_pool_b` (
  `CNW_CD` int(32) NOT NULL AUTO_INCREMENT COMMENT '出水池编码',
  `CNW_NAME` varchar(32) NOT NULL COMMENT '名称',
  `NODE_CD` int(32) DEFAULT NULL COMMENT '节点编码',
  `OBJ_CD` varchar(32) DEFAULT NULL COMMENT '对象编码',
  `LGTD` double DEFAULT NULL COMMENT '经度',
  `LTTD` double DEFAULT NULL COMMENT '纬度',
  `Q` double DEFAULT NULL COMMENT '设计流量',
  `OUT_W` double DEFAULT NULL COMMENT '出水池水位',
  `PIPE_SIZE` double DEFAULT NULL COMMENT '水管直径',
  `PIPE_C` int(2) DEFAULT NULL COMMENT '水管根数',
  `SZFD` enum('1','2','3','4','0') DEFAULT NULL COMMENT '所在分段（1-一段，2-二段，3-三段，4-四段，0-其他）',
  `Z` double DEFAULT NULL COMMENT '从实时水位表获取的水位高程',
  `NT` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`CNW_CD`),
  UNIQUE KEY `CNW_CD` (`CNW_CD`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `prj_valve_b`
--

CREATE TABLE IF NOT EXISTS `prj_valve_b` (
  `VAV_CD` int(32) NOT NULL AUTO_INCREMENT COMMENT '阀门编码',
  `NODE_CD` int(32) DEFAULT NULL COMMENT '节点编码',
  `LGTD` double DEFAULT NULL COMMENT '经度',
  `LTTD` double DEFAULT NULL COMMENT '纬度',
  `VAV_NM` varchar(50) DEFAULT NULL COMMENT '阀门名称',
  `VAV_TYPE` enum('1','2','3','4','0') DEFAULT NULL COMMENT '阀门类别（1 一段 2 二段 3 三段 4 四段 0 其他）',
  `VAV_WORK` enum('1','2','3') DEFAULT NULL COMMENT '驱动方式（1电动 2手动 3液压）',
  `VAV_SIZE` double DEFAULT NULL COMMENT '直径（mm）',
  `MP` double DEFAULT NULL COMMENT '压力等级（Mpa）',
  `ISMP` enum('1','2') DEFAULT NULL COMMENT '开启条件（1 带压开启 2 平压开启）',
  `MAXMP` varchar(32) DEFAULT NULL COMMENT '带压开启最大压力差（MPa）',
  `SZFD` enum('1','2','3','4','0') DEFAULT NULL COMMENT '所在分段（1 一段 2 二段 3 三段 4 四段 0 其他）',
  `USER_TYPE` enum('1','2','0') DEFAULT NULL COMMENT '用途（1-截断阀，2-调流阀，0-其他）',
  `AZGC` double DEFAULT NULL COMMENT '安装高程（m）',
  `ISOPERATE` tinyint(1) DEFAULT NULL COMMENT '阀门是否被操作',
  `STAKEMARK` varchar(32) DEFAULT NULL COMMENT '桩号',
  `KD` double DEFAULT NULL COMMENT '阀门初始开度',
  `VA_OTHER_Q` double DEFAULT NULL COMMENT '流量',
  `VA_OTHER_MP` double DEFAULT NULL COMMENT '设计压力',
  `VA_OTHER_SIZE` double DEFAULT NULL COMMENT '直径',
  `N_VALVE` int(2) DEFAULT NULL COMMENT '调流阀数',
  `KD_V0` double DEFAULT NULL,
  `AV` double DEFAULT NULL COMMENT '阀门全开时的阻力系数 根据 阀门特性关系曲线关系表 中开度为1时的阻力系数',
  `NT` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`VAV_CD`),
  UNIQUE KEY `VAV_CD` (`VAV_CD`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='阀门基础信息表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `sys_user`
--

CREATE TABLE IF NOT EXISTS `sys_user` (
  `ID` int(32) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `USER_NAME` varchar(32) NOT NULL COMMENT '用户名',
  `PASSWORD` varchar(32) NOT NULL COMMENT '密码',
  `NAME` varchar(40) NOT NULL COMMENT '用户名',
  `SEX` char(4) DEFAULT NULL COMMENT '性别',
  `TEL` int(11) DEFAULT NULL COMMENT '手机号码',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT '电子邮箱',
  `BIRTHDAY` date DEFAULT NULL COMMENT '出生年月',
  `TYPE` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户类型（是否为管理员，0-非管理员，1-管理员）',
  `DESCRIPTION` varchar(256) DEFAULT NULL,
  `DEL_FALG` tinyint(1) DEFAULT '0' COMMENT '删除标识（0-未删除，1-已删除）',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER_NAME` (`USER_NAME`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `ID_2` (`ID`),
  UNIQUE KEY `ID_3` (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='系统用户表' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `sys_user`
--

INSERT INTO `sys_user` (`ID`, `USER_NAME`, `PASSWORD`, `NAME`, `SEX`, `TEL`, `EMAIL`, `BIRTHDAY`, `TYPE`, `DESCRIPTION`, `DEL_FALG`) VALUES
(1, '123', '123', '张三', NULL, NULL, NULL, '0000-00-00', 0, NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `ID` int(22) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `age` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `test`
--

INSERT INTO `test` (`ID`, `user_name`, `password`, `age`) VALUES
(1, '222', '222', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
