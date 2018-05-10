-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: water_manage_system
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `prj`
--

DROP TABLE IF EXISTS `prj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj` (
  `ID` varchar(64) NOT NULL COMMENT '工程ID',
  `NAME` varchar(64) NOT NULL COMMENT '工程名',
  `LASTALTER` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `NEW_KEY` int(11) NOT NULL,
  `VERIFY_MEG` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NAME_UNIQUE` (`NAME`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj`
--

LOCK TABLES `prj` WRITE;
/*!40000 ALTER TABLE `prj` DISABLE KEYS */;
INSERT INTO `prj` VALUES ('c78ad4a6-af42-4bba-8ff8-4dda9bae6b23','测试3','2018-05-10 11:36:37',0,0),('0207edf7-4d11-4a6a-b67d-4a281bff983e','测试2','2018-05-10 10:44:08',0,0),('fc3af9eb-e285-4268-8869-5072fd3d46af','测试1','2018-05-10 10:40:09',0,0);
/*!40000 ALTER TABLE `prj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_gd_b`
--

DROP TABLE IF EXISTS `prj_gd_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj_gd_b` (
  `DEVICE_CODE` varchar(64) NOT NULL COMMENT '设备编号',
  `DEVICE_NAME` varchar(64) NOT NULL COMMENT '设备名称',
  `BELONG_TO_PCODE` varchar(64) NOT NULL COMMENT '所属的拓扑图的编码，而拓扑图的编码就是工程的编码。',
  `BEGIN_STAKE_MARK` double NOT NULL COMMENT '起点桩号',
  `END_STAKE_MARK` double NOT NULL COMMENT '终点桩号',
  `IN_HIGHT` double NOT NULL COMMENT '进口底高程（m）',
  `OUT_HIGHT` double NOT NULL COMMENT '出口底高程（m）',
  `PIPE_MATE` varchar(64) NOT NULL COMMENT '管材',
  `EQUIMENT_LENGTH` double NOT NULL COMMENT '设备长度',
  `SLOPE` double NOT NULL COMMENT '坡度',
  `SHAPE` varchar(64) NOT NULL COMMENT '断面形状',
  `WATER_POWER` double NOT NULL COMMENT '水力半径（m）',
  `ROUGHNESS` double NOT NULL COMMENT '糙率',
  `YCXS` double NOT NULL COMMENT '沿程系数',
  `YCSS` double NOT NULL COMMENT '沿程损失',
  `TJTXML` double NOT NULL COMMENT '体积弹性模量',
  `INI_Q` double NOT NULL COMMENT '初始流量',
  `RESULT_Q` double NOT NULL COMMENT '稳定计算结果',
  `DESIGN_PRESSURE` double NOT NULL COMMENT '设计压力',
  `SCBS` double NOT NULL COMMENT '水锤波速',
  `DESIGN_V` double NOT NULL COMMENT '设计流速（m3/s）',
  `PIPE_COUNT` int(3) NOT NULL COMMENT '管段数',
  `INSIDE_P` int(11) NOT NULL COMMENT '内点',
  `PIPE_INSIDE_R` double NOT NULL COMMENT '内径（mm）',
  `PIPE_THICK` double NOT NULL COMMENT '壁厚',
  `CYDJ` varchar(64) NOT NULL COMMENT '承压等级(MPa)',
  `QHYL` double NOT NULL COMMENT '汽化压力（MPa）',
  `B` double NOT NULL,
  `R` double NOT NULL,
  `NOTE` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`DEVICE_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='管道基础信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_gd_b`
--

LOCK TABLES `prj_gd_b` WRITE;
/*!40000 ALTER TABLE `prj_gd_b` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_gd_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_graph`
--

DROP TABLE IF EXISTS `prj_graph`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj_graph` (
  `CELL_ID` varchar(64) NOT NULL COMMENT '元件ID',
  `PRJ_ID` varchar(64) NOT NULL COMMENT '原价所在工程的ID',
  `PRIOR_CELL_ID` varchar(64) DEFAULT NULL COMMENT '该元件前一个元件ID',
  `NEXT_CELL_ID` varchar(64) DEFAULT NULL COMMENT '该元件后一个元件ID\n',
  `COMMENTS` varchar(64) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`CELL_ID`),
  UNIQUE KEY `CELL_ID_UNIQUE` (`CELL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工程元件表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_graph`
--

LOCK TABLES `prj_graph` WRITE;
/*!40000 ALTER TABLE `prj_graph` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_graph` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_intakesump_b`
--

DROP TABLE IF EXISTS `prj_intakesump_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj_intakesump_b` (
  `DEVICE_CODE` varchar(64) NOT NULL COMMENT '设备编码',
  `DEVICE_NAME` varchar(64) NOT NULL COMMENT '设备名称',
  `BELONG_TO_PCODE` varchar(64) NOT NULL COMMENT '所属的拓扑图的编码，而拓扑图的编码就是工程的编码。',
  `LGTD` double NOT NULL COMMENT '经度',
  `LTTD` double NOT NULL COMMENT '纬度',
  `DESIGN_Q` double NOT NULL COMMENT '设计流量',
  `INTAKESUMP_LEVEL` double NOT NULL COMMENT '进水池水位',
  `PIPE_SIZE` double NOT NULL COMMENT '水管直径',
  `PIPE_COUNT` int(11) NOT NULL COMMENT '水管根数',
  `DESIGN_PRESSURE` double NOT NULL COMMENT '设计压力',
  `SECTION_IN` varchar(64) NOT NULL COMMENT '所在分段',
  `WATER_HEIGHT` double NOT NULL COMMENT '从实时水位表获取的水位高程',
  `NOTE` varchar(400) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`DEVICE_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='进水池基础信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_intakesump_b`
--

LOCK TABLES `prj_intakesump_b` WRITE;
/*!40000 ALTER TABLE `prj_intakesump_b` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_intakesump_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_node_b`
--

DROP TABLE IF EXISTS `prj_node_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj_node_b` (
  `OBJ_CODE` varchar(64) NOT NULL COMMENT '对象编码是每一个图元在拓扑图中有一个自己的唯一标志编码',
  `MODEL_CODE` varchar(64) NOT NULL COMMENT '模型编码是指当前图元所在的拓扑图的编码',
  `DEVICE_NAME` varchar(64) NOT NULL COMMENT '设备名称',
  `NODE_CODE` varchar(64) DEFAULT NULL COMMENT '节点编码',
  `NODE_NAME` varchar(100) DEFAULT NULL COMMENT '节点名称',
  `HEIGHT` double DEFAULT NULL COMMENT '高程',
  `LGTD` double DEFAULT NULL COMMENT '经度',
  `LTTD` double DEFAULT NULL COMMENT '纬度',
  `QHYL` double DEFAULT NULL COMMENT '汽化压力',
  `DESIGN_PRESSURE` double DEFAULT NULL COMMENT '压力',
  `Q` double DEFAULT NULL COMMENT '流量',
  `SECTION_IN` varchar(64) DEFAULT NULL COMMENT '所在分段（1-一段，2-二段，3-三段，4-四段，0-其他）',
  `RESULT_H` double DEFAULT NULL COMMENT '计算结果中的压力（水力）',
  PRIMARY KEY (`OBJ_CODE`),
  UNIQUE KEY `NODE_CD` (`MODEL_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='节点';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_node_b`
--

LOCK TABLES `prj_node_b` WRITE;
/*!40000 ALTER TABLE `prj_node_b` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_node_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_out_pool_b`
--

DROP TABLE IF EXISTS `prj_out_pool_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj_out_pool_b` (
  `DEVICE_CODE` varchar(64) NOT NULL COMMENT '设备编码',
  `DEVICE_NAME` varchar(64) NOT NULL COMMENT '设备名称',
  `BELONG_TO_PCODE` varchar(64) NOT NULL COMMENT '所属的拓扑图的编码，而拓扑图的编码就是工程的编码。',
  `LGTD` varchar(64) NOT NULL COMMENT '经度',
  `LTTD` double NOT NULL COMMENT '纬度',
  `DESIGN_Q` double NOT NULL COMMENT '设计流量',
  `OUTPOOL_LEVEL` double NOT NULL COMMENT '出水池水位',
  `PIPE_SIZE` double NOT NULL COMMENT '水管直径',
  `PIPE_COUNT` int(2) NOT NULL COMMENT '水管根数',
  `SECTION_IN` varchar(64) NOT NULL COMMENT '所在分段',
  `WATER_HEIGHT` double NOT NULL COMMENT '从实时水位表获取的水位高程',
  `NOTE` varchar(400) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`DEVICE_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_out_pool_b`
--

LOCK TABLES `prj_out_pool_b` WRITE;
/*!40000 ALTER TABLE `prj_out_pool_b` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_out_pool_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj_valve_b`
--

DROP TABLE IF EXISTS `prj_valve_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj_valve_b` (
  `DEVICE_CODE` varchar(64) NOT NULL COMMENT '设备编号',
  `DEVICE_NAME` varchar(64) NOT NULL COMMENT '设备名称',
  `BELONG_TO_PCODE` varchar(64) NOT NULL COMMENT '所属的拓扑图的编码，而拓扑图的编码就是工程的编码。',
  `VAV_TYPE` varchar(64) NOT NULL COMMENT '阀门类别（1 一段 2 二段 3 三段 4 四段 0 其他）',
  `IS_OPERATE` int(11) NOT NULL COMMENT '阀门是否被操作',
  `STAKE_MARK` double NOT NULL COMMENT '桩号',
  `VAV_WORK` varchar(64) NOT NULL COMMENT '驱动方式（1电动 2手动 3液压）',
  `VAV_SEC_IN` varchar(64) NOT NULL COMMENT '所在分段（1 一段 2 二段 3 三段 4 四段 0 其他）',
  `LGTD` double NOT NULL COMMENT '经度',
  `LTTD` double NOT NULL COMMENT '纬度',
  `VAV_SIZE` double NOT NULL COMMENT '直径（mm）',
  `PRESSURE_LEVEL` double NOT NULL COMMENT '压力等级（Mpa）',
  `START_CONDI` varchar(64) NOT NULL COMMENT '开启条件（1 带压开启 2 平压开启）',
  `MAX_DELPRE_START` double NOT NULL COMMENT '带压开启最大压力差（MPa）',
  `USER_TYPE` varchar(64) NOT NULL COMMENT '用途（1-截断阀，2-调流阀，0-其他）',
  `INSTALL_HEIGHT` double NOT NULL COMMENT '安装高程（m）',
  `INI_OPEN_LEVEL` double NOT NULL COMMENT '阀门初始开度',
  `Q` double NOT NULL COMMENT '流量',
  `DESIGN_PRESSURE` double NOT NULL COMMENT '设计压力',
  `VAV_OTHER_SIZE` double NOT NULL COMMENT '直径',
  `INI_OPENLEVEL_MIN` double NOT NULL COMMENT '阀门初始开度',
  `PRESSURE_WORK` varchar(64) NOT NULL COMMENT '是否有压工作',
  `PREW_MAX_DEL` double NOT NULL COMMENT '有压工作最大压力差',
  `NVAV_COUNT` int(11) NOT NULL COMMENT '调流阀数',
  `K_ALL_OPEN` double NOT NULL COMMENT '阀门全开时的阻力系数 根据 阀门特性关系曲线关系表 中开度为1时的阻力系数',
  `VAV_SIDE_S` double NOT NULL COMMENT '阀门的截面积',
  `NOTE` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`DEVICE_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='阀门基础信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj_valve_b`
--

LOCK TABLES `prj_valve_b` WRITE;
/*!40000 ALTER TABLE `prj_valve_b` DISABLE KEYS */;
/*!40000 ALTER TABLE `prj_valve_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user` (
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='系统用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,'123','123','张三',NULL,NULL,NULL,'0000-00-00',0,NULL,0);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (12,'asdasd'),(15,'asd '),(333,'黄家驹'),(6666,''),(12333,''),(132123,'wangq'),(123123123,'123123123');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'water_manage_system'
--

--
-- Dumping routines for database 'water_manage_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-10 20:19:29
