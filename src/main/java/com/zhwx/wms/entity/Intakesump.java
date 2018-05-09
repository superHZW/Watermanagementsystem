package com.zhwx.wms.entity;

public class Intakesump {
    private Integer cnwCd;

    private Integer nodeCd;

    private String cnwNm;

    private String objCd;

    private Double lgtd;

    private Double lttd;

    private Double q;

    private Double pipeSize;

    private Integer pipeC;

    private Double mp;

    private String szfd;

    private Double z;

    private String nt;

    public Integer getCnwCd() {
        return cnwCd;
    }

    public void setCnwCd(Integer cnwCd) {
        this.cnwCd = cnwCd;
    }

    public Integer getNodeCd() {
        return nodeCd;
    }

    public void setNodeCd(Integer nodeCd) {
        this.nodeCd = nodeCd;
    }

    public String getCnwNm() {
        return cnwNm;
    }

    public void setCnwNm(String cnwNm) {
        this.cnwNm = cnwNm == null ? null : cnwNm.trim();
    }

    public String getObjCd() {
        return objCd;
    }

    public void setObjCd(String objCd) {
        this.objCd = objCd == null ? null : objCd.trim();
    }

    public Double getLgtd() {
        return lgtd;
    }

    public void setLgtd(Double lgtd) {
        this.lgtd = lgtd;
    }

    public Double getLttd() {
        return lttd;
    }

    public void setLttd(Double lttd) {
        this.lttd = lttd;
    }

    public Double getQ() {
        return q;
    }

    public void setQ(Double q) {
        this.q = q;
    }

    public Double getPipeSize() {
        return pipeSize;
    }

    public void setPipeSize(Double pipeSize) {
        this.pipeSize = pipeSize;
    }

    public Integer getPipeC() {
        return pipeC;
    }

    public void setPipeC(Integer pipeC) {
        this.pipeC = pipeC;
    }

    public Double getMp() {
        return mp;
    }

    public void setMp(Double mp) {
        this.mp = mp;
    }

    public String getSzfd() {
        return szfd;
    }

    public void setSzfd(String szfd) {
        this.szfd = szfd == null ? null : szfd.trim();
    }

    public Double getZ() {
        return z;
    }

    public void setZ(Double z) {
        this.z = z;
    }

    public String getNt() {
        return nt;
    }

    public void setNt(String nt) {
        this.nt = nt == null ? null : nt.trim();
    }
}