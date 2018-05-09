package com.zhwx.wms.entity;

import java.util.Date;

public class Project {
    private String id;

    private String name;

    private Date lastalter;

    private Integer newKey;

    private Integer verifyMeg;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Date getLastalter() {
        return lastalter;
    }

    public void setLastalter(Date lastalter) {
        this.lastalter = lastalter;
    }

    public Integer getNewKey() {
        return newKey;
    }

    public void setNewKey(Integer newKey) {
        this.newKey = newKey;
    }

    public Integer getVerifyMeg() {
        return verifyMeg;
    }

    public void setVerifyMeg(Integer verifyMeg) {
        this.verifyMeg = verifyMeg;
    }
}