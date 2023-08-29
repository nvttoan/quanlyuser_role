package com.project1.spring.login.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "namemenu")
    private String nameMenu;
    @Column(name = "code")
    private String code;
    @Column(name = "url")
    private String url;
    @Column(name = "urlparent")
    private String urlparent;
    @Column(name = "description")
    private String description;
    @Column(name = "icon")
    private String icon;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "menu_roles", joinColumns = @JoinColumn(name = "menu_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // Constructors, getters, setters

    public long getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameMenu() {
        return nameMenu;
    }

    public void setNameMenu(String nameMenu) {
        this.nameMenu = nameMenu;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrlParent() {
        return urlparent;
    }

    public void setUrlParent(String urlparent) {
        this.urlparent = urlparent;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    /**
     * @return String return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * @return String return the urlparent
     */
    public String getUrlparent() {
        return urlparent;
    }

    /**
     * @param urlparent the urlparent to set
     */
    public void setUrlparent(String urlparent) {
        this.urlparent = urlparent;
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return String return the icon
     */
    public String getIcon() {
        return icon;
    }

    /**
     * @param icon the icon to set
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

}
