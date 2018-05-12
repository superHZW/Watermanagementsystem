package com.zhwx.wms.entity;

public class Valve {
    private String deviceCode;

    private String deviceName;

    private String belongToPcode;

    private String vavType;

    private Integer isOperate;

    private Double stakeMark;

    private String vavWork;

    private String vavSecIn;

    private Double lgtd;

    private Double lttd;

    private Double vavSize;

    private Double pressureLevel;

    private String startCondi;

    private Double maxDelpreStart;

    private String userType;

    private Double installHeight;

    private Double iniOpenLevel;

    private Double q;

    private Double designPressure;

    private Double vavOtherSize;

    private Double iniOpenlevelMin;

    private String pressureWork;

    private Double prewMaxDel;

    private Integer nvavCount;

    private Double kAllOpen;

    private Double vavSideS;

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

    public String getVavType() {
        return vavType;
    }

    public void setVavType(String vavType) {
        this.vavType = vavType == null ? null : vavType.trim();
    }

    public Integer getIsOperate() {
        return isOperate;
    }

    public void setIsOperate(Integer isOperate) {
        this.isOperate = isOperate;
    }

    public Double getStakeMark() {
        return stakeMark;
    }

    public void setStakeMark(Double stakeMark) {
        this.stakeMark = stakeMark;
    }

    public String getVavWork() {
        return vavWork;
    }

    public void setVavWork(String vavWork) {
        this.vavWork = vavWork == null ? null : vavWork.trim();
    }

    public String getVavSecIn() {
        return vavSecIn;
    }

    public void setVavSecIn(String vavSecIn) {
        this.vavSecIn = vavSecIn == null ? null : vavSecIn.trim();
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

    public Double getVavSize() {
        return vavSize;
    }

    public void setVavSize(Double vavSize) {
        this.vavSize = vavSize;
    }

    public Double getPressureLevel() {
        return pressureLevel;
    }

    public void setPressureLevel(Double pressureLevel) {
        this.pressureLevel = pressureLevel;
    }

    public String getStartCondi() {
        return startCondi;
    }

    public void setStartCondi(String startCondi) {
        this.startCondi = startCondi == null ? null : startCondi.trim();
    }

    public Double getMaxDelpreStart() {
        return maxDelpreStart;
    }

    public void setMaxDelpreStart(Double maxDelpreStart) {
        this.maxDelpreStart = maxDelpreStart;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType == null ? null : userType.trim();
    }

    public Double getInstallHeight() {
        return installHeight;
    }

    public void setInstallHeight(Double installHeight) {
        this.installHeight = installHeight;
    }

    public Double getIniOpenLevel() {
        return iniOpenLevel;
    }

    public void setIniOpenLevel(Double iniOpenLevel) {
        this.iniOpenLevel = iniOpenLevel;
    }

    public Double getQ() {
        return q;
    }

    public void setQ(Double q) {
        this.q = q;
    }

    public Double getDesignPressure() {
        return designPressure;
    }

    public void setDesignPressure(Double designPressure) {
        this.designPressure = designPressure;
    }

    public Double getVavOtherSize() {
        return vavOtherSize;
    }

    public void setVavOtherSize(Double vavOtherSize) {
        this.vavOtherSize = vavOtherSize;
    }

    public Double getIniOpenlevelMin() {
        return iniOpenlevelMin;
    }

    public void setIniOpenlevelMin(Double iniOpenlevelMin) {
        this.iniOpenlevelMin = iniOpenlevelMin;
    }

    public String getPressureWork() {
        return pressureWork;
    }

    public void setPressureWork(String pressureWork) {
        this.pressureWork = pressureWork == null ? null : pressureWork.trim();
    }

    public Double getPrewMaxDel() {
        return prewMaxDel;
    }

    public void setPrewMaxDel(Double prewMaxDel) {
        this.prewMaxDel = prewMaxDel;
    }

    public Integer getNvavCount() {
        return nvavCount;
    }

    public void setNvavCount(Integer nvavCount) {
        this.nvavCount = nvavCount;
    }

    public Double getkAllOpen() {
        return kAllOpen;
    }

    public void setkAllOpen(Double kAllOpen) {
        this.kAllOpen = kAllOpen;
    }

    public Double getVavSideS() {
        return vavSideS;
    }

    public void setVavSideS(Double vavSideS) {
        this.vavSideS = vavSideS;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }
}