package com.zhwx.wms.entity;

public class Prjgraph {
    private String cellId;

    private String prjId;

    private String priorCellId;

    private String nextCellId;

    private String comments;

    public String getCellId() {
        return cellId;
    }

    public void setCellId(String cellId) {
        this.cellId = cellId == null ? null : cellId.trim();
    }

    public String getPrjId() {
        return prjId;
    }

    public void setPrjId(String prjId) {
        this.prjId = prjId == null ? null : prjId.trim();
    }

    public String getPriorCellId() {
        return priorCellId;
    }

    public void setPriorCellId(String priorCellId) {
        this.priorCellId = priorCellId == null ? null : priorCellId.trim();
    }

    public String getNextCellId() {
        return nextCellId;
    }

    public void setNextCellId(String nextCellId) {
        this.nextCellId = nextCellId == null ? null : nextCellId.trim();
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments == null ? null : comments.trim();
    }
}