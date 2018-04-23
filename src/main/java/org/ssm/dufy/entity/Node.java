package org.ssm.dufy.entity;

public class Node {
    private Integer nodeCd;

    private String nodeNm;

    private String objCd;

    private Integer cnwCd;

    private String cnwNm;

    private Double height;

    private Double qhyl;

    private Double mp;

    private Double q;

    private String szfd;

    private Double lgtd;

    private Double lttd;

    private Double resultH;

    private String nt;

    public Integer getNodeCd() {
        return nodeCd;
    }

    public void setNodeCd(Integer nodeCd) {
        this.nodeCd = nodeCd;
    }

    public String getNodeNm() {
        return nodeNm;
    }

    public void setNodeNm(String nodeNm) {
        this.nodeNm = nodeNm == null ? null : nodeNm.trim();
    }

    public String getObjCd() {
        return objCd;
    }

    public void setObjCd(String objCd) {
        this.objCd = objCd == null ? null : objCd.trim();
    }

    public Integer getCnwCd() {
        return cnwCd;
    }

    public void setCnwCd(Integer cnwCd) {
        this.cnwCd = cnwCd;
    }

    public String getCnwNm() {
        return cnwNm;
    }

    public void setCnwNm(String cnwNm) {
        this.cnwNm = cnwNm == null ? null : cnwNm.trim();
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getQhyl() {
        return qhyl;
    }

    public void setQhyl(Double qhyl) {
        this.qhyl = qhyl;
    }

    public Double getMp() {
        return mp;
    }

    public void setMp(Double mp) {
        this.mp = mp;
    }

    public Double getQ() {
        return q;
    }

    public void setQ(Double q) {
        this.q = q;
    }

    public String getSzfd() {
        return szfd;
    }

    public void setSzfd(String szfd) {
        this.szfd = szfd == null ? null : szfd.trim();
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

    public Double getResultH() {
        return resultH;
    }

    public void setResultH(Double resultH) {
        this.resultH = resultH;
    }

    public String getNt() {
        return nt;
    }

    public void setNt(String nt) {
        this.nt = nt == null ? null : nt.trim();
    }
}