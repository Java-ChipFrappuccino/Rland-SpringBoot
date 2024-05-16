package kr.co.rland.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.service.MenuService;

@Controller
@RequestMapping("cart")
public class CartController {
    @Autowired
    private MenuService menuService;

    // @Autowired
    // private CategoryService categoryService;
    @GetMapping("list")
    public String list(@CookieValue String menus,Model model) {
        System.out.println(menus+"\n 쿠키에 담긴 메뉴");
        
        //decode
        String menuStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
        System.out.println(menuStr+"\n 디코딩된 메뉴");
        
        //new
        Menu menu = new Gson().fromJson(menuStr, Menu.class);
        System.out.println(menu+"\n 객체화된 메뉴");
        List<Menu> menuList;

        if (menus == null) {
            menuList = new ArrayList<>(); }
        else {
            String menusStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
            menuList = new Gson().fromJson(menusStr, List.class);
        }

        model.addAttribute(menus, menuList);

        return "cart/list";
    }

    @PostMapping("add-menu")
    public String addMenu(Long id,@CookieValue(required = false) String menus,HttpServletResponse response) {

        List<Menu> menuList;
        {
            if (menus == null) {
                menuList = new ArrayList<>(); }
            else {
                String menusStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
                menuList = new Gson().fromJson(menusStr, List.class);
            }
        }
        Menu menu = menuService.getById(id);
        menuList.add(menu);

        String menuStr = new Gson().toJson(menuList);
        // System.out.println(menuStr+"이거나오면 잘됨");


        /* StringBuilder menus = new StringBuilder(); //json을 배우기전 써봄
        //처음이 아니라면
        String cookieValue = "\n";
        menus.append(cookieValue);
        menus.append(menu.getId());
        menus.append("_"); //쉼표가 컨텐츠에 포함되어있으면 안된다
        menus.append(menu.getKorName());

        String menusStr = menus.toString();*/

        String menuEncoded = ""; //쿠키에 담기위해 인코딩 과정을 거침
        try {
            menuEncoded = URLEncoder.encode(menuStr, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
       
        // System.out.println("테스트테스트테스트테스트테스트테스트테스트테스트테스트"+menuEncoded);
        Cookie menusCookie = new Cookie("menus", menuEncoded);
        menusCookie.setPath("/");
        response.addCookie(menusCookie); //객체를 넣을수없으므로 안에 데이터를 다 쪼개서 문자열로 넣어줌

        return "redirect:/menu/list";
    }
}
