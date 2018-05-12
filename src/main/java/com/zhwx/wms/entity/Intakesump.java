package com.zhwx.wms.entity;

public class Intakesump {
    private String deviceCode;

    private String deviceName;

    private String belongToPcode;

    private Double lgtd;

    private Double lttd;

    private Double designQ;

    private Double intakesumpLevel;

    private Double pipeSize;

    private Integer pipeCount;

    private Double designPressure;

    private String sectionIn;

    private Double waterHeight;

    private String note;

    public String getDeviceCode() {
        return deviceCode;
    }

    public void setDeviceCode(String deviceCode) {
        this.deviceCode = deviceCode == null ? null : deviceCode.trim();
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName == null ? null : deviceName.trim();
    }

    public String getBelongToPcode() {
        return belongToPcode;
    }

    public void setBelongToPcode(String belongToPcode) {
        this.belongToPcode = belongToPcode == null ? null : belongToPcode.trim();
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

    public Double getDesignQ() {
        return designQ;
    }

    public void setDesignQ(Double designQ) {
        this.designQ = designQ;
    }

    public Double getIntakesumpLevel() {
        return intakesumpLevel;
    }

    public void setIntakesumpLevel(Double intakesumpLevel) {
        this.intakesumpLevel = intakesumpLevel;
    }

    public Double getPipeSize() {
        return pipeSize;
    }

    public void setPipeSize(Double pipeSize) {
        this.pipeSize = pipeSize;
    }

    public Integer getPipeCount() {
        return pipeCount;
    }

    public void setPipeCount(Integer pipeCount) {
        this.pipeCount = pipeCount;
    }

    public Double getDesignPressure() {
        return designPressure;
    }

    public void setDesignPressure(Double designPressure) {
        this.designPressure = designPressure;
    }

    public String getSectionIn() {
        return sectionIn;
    }

    public void setSectionIn(String sectionIn) {
        this.sectionIn = sectionIn == null ? null : sectionIn.trim();
    }

    public Double getWaterHeight() {
        return waterHeight;
    }

    public void setWaterHeight(Double waterHeight) {
        this.waterHeight = waterHeight;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }
}