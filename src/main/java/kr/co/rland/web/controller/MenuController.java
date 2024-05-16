package kr.co.rland.web.controller;

import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.List;

import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import kr.co.rland.web.config.security.WebUserDetails;
import kr.co.rland.web.entity.Category;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.CategoryService;
import kr.co.rland.web.service.MenuService;

@Controller
@RequestMapping("menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @Autowired
    private CategoryService categoryService;

    //react list -----------------------------------------------------------------------
//    @GetMapping("list-react")
//    public String listReact(
//            @RequestParam(name = "c",required = false) Long categoryId,
//            @RequestParam(name = "s",required = false) String query,
//            @RequestParam(name = "p",required = false, defaultValue = "1") Integer page,
//            @AuthenticationPrincipal WebUserDetails userDetails,
//            @CookieValue(name = "menus",required = false) String menusCookie,
//            Model model) {
//
//        Long memberId = null;
//        if (userDetails != null) {
//            memberId = userDetails.getId();
//        }
//
//        // List<MenuView> list = menuService.getList();
//        List<MenuView> list = menuService.getList(memberId, page);
//        int count = 0;
//        count = menuService.getCount();
//
//        if (categoryId != null) {
//            list = menuService.getList(memberId, page, categoryId);
//            count = menuService.getCount(categoryId);
//        } else if (query != null) {
//            list = menuService.getList(memberId, page, query);
//            count = menuService.getCount(query);
//        }
//        //  else {
//        //     list = menuService.getList();
//        // }
//
//        List<Category> category = categoryService.getList();
//
//        model.addAttribute("list",list);
//        model.addAttribute("category",category);
//        model.addAttribute("count", count);
//
//        int cartTotalPrice = 0;
//        int cartCount = 0;
//
//        {
//            if (menusCookie != null) {
//                String menusStr = URLDecoder.decode(menusCookie, Charset.forName("utf-8"));
//
//                // menuList = new Gson().fromJson(menusStr, List.class);
//
//                Type type = new TypeToken<List<Menu>>() {}.getType(); //list배열안의 객체가 menu타입인지 모르기 때문에 타입을 직접적으로 명시해줘야 한다
//                List<Menu> ml = new Gson().fromJson(menusStr, type);
//
//                for (Menu m : ml) {
//                    cartTotalPrice += m.getPrice();
//                }
//
//                // for (int i = 0; i < ml.size(); i++) {
//                //     cartTotalPrice += ml.get(i).getPrice();
//                // };
//                cartCount = ml.size();
//
//                // JSON 문자열을 Menu 객체 리스트로 변환
//                // List<Object> menuList = new Gson().fromJson(menusStr, List.class);
//                // cartCount = menuList.size();
//                // LinkedTreeMap<String, Object> map = new LinkedTreeMap<>();
//                // for (int i = 0; i < cartCount; i++) {
//                //     map = (LinkedTreeMap<String, Object>) menuList.get(i);
//                //     Object price = map.get("price");
//                //     cartTotalPrice += (int) Double.parseDouble(String.valueOf(price));
//                // }
//            }
//        }
//
//        model.addAttribute("cartTotalPrice", cartTotalPrice);
//        model.addAttribute("cartCount", cartCount);
//
//        return "menu/list-react";
//    }
//
//    //vue list -------------------------------------------------------------------------
//    @GetMapping("list-vue")
//    public String listVue(
//            @RequestParam(name = "c",required = false) Long categoryId,
//            @RequestParam(name = "s",required = false) String query,
//            @RequestParam(name = "p",required = false, defaultValue = "1") Integer page,
//            @AuthenticationPrincipal WebUserDetails userDetails,
//            @CookieValue(name = "menus",required = false) String menusCookie,
//            Model model) {
//
//        Long memberId = null;
//        if (userDetails != null) {
//            memberId = userDetails.getId();
//        }
//
//        // List<MenuView> list = menuService.getList();
//        List<MenuView> list = menuService.getList(memberId, page);
//        int count = 0;
//        count = menuService.getCount();
//
//        if (categoryId != null) {
//            list = menuService.getList(memberId, page, categoryId);
//            count = menuService.getCount(categoryId);
//        } else if (query != null) {
//            list = menuService.getList(memberId, page, query);
//            count = menuService.getCount(query);
//        }
//        //  else {
//        //     list = menuService.getList();
//        // }
//
//        List<Category> category = categoryService.getList();
//
//        model.addAttribute("list",list);
//        model.addAttribute("category",category);
//        model.addAttribute("count", count);
//
//        int cartTotalPrice = 0;
//        int cartCount = 0;
//
//        {
//            if (menusCookie != null) {
//                String menusStr = URLDecoder.decode(menusCookie, Charset.forName("utf-8"));
//
//                // menuList = new Gson().fromJson(menusStr, List.class);
//
//                Type type = new TypeToken<List<Menu>>() {}.getType(); //list배열안의 객체가 menu타입인지 모르기 때문에 타입을 직접적으로 명시해줘야 한다
//                List<Menu> ml = new Gson().fromJson(menusStr, type);
//
//                for (Menu m : ml) {
//                    cartTotalPrice += m.getPrice();
//                }
//
//                // for (int i = 0; i < ml.size(); i++) {
//                //     cartTotalPrice += ml.get(i).getPrice();
//                // };
//                cartCount = ml.size();
//
//                // JSON 문자열을 Menu 객체 리스트로 변환
//                // List<Object> menuList = new Gson().fromJson(menusStr, List.class);
//                // cartCount = menuList.size();
//                // LinkedTreeMap<String, Object> map = new LinkedTreeMap<>();
//                // for (int i = 0; i < cartCount; i++) {
//                //     map = (LinkedTreeMap<String, Object>) menuList.get(i);
//                //     Object price = map.get("price");
//                //     cartTotalPrice += (int) Double.parseDouble(String.valueOf(price));
//                // }
//            }
//        }
//
//        model.addAttribute("cartTotalPrice", cartTotalPrice);
//        model.addAttribute("cartCount", cartCount);
//
//        return "menu/list-vue";
//    }


    //dom list -------------------------------------------------------------------------
    @GetMapping("list")
    public String list(
        @RequestParam(name = "c",required = false) Long categoryId,
        @RequestParam(name = "s",required = false) String query,
        @RequestParam(name = "p",required = false, defaultValue = "1") Integer page,
        @AuthenticationPrincipal WebUserDetails userDetails,
        @CookieValue(name = "menus",required = false) String menusCookie,
         Model model) {

        Long memberId = null;
        if (userDetails != null) {
            memberId = userDetails.getId();
        }
        
        // List<MenuView> list = menuService.getList();
        List<MenuView> list = menuService.getList(memberId, page);
        int count = 0;
        count = menuService.getCount();

        if (categoryId != null) {
            list = menuService.getList(memberId, page, categoryId);
            count = menuService.getCount(categoryId);
        } else if (query != null) {
            list = menuService.getList(memberId, page, query);
            count = menuService.getCount(query);
        }
        //  else {
        //     list = menuService.getList();
        // }

        List<Category> category = categoryService.getList();

        model.addAttribute("list",list);
        model.addAttribute("category",category);
        model.addAttribute("count", count);

        int cartTotalPrice = 0;
        int cartCount = 0;

        {
            if (menusCookie != null) {
                String menusStr = URLDecoder.decode(menusCookie, Charset.forName("utf-8"));

                // menuList = new Gson().fromJson(menusStr, List.class);

//                Gson gson = new GsonBuilder()
//                        // 기존 코드
//                        .setDateFormat("MMM d, yyyy, h:mm:ss a") // 날짜 형식 지정
//                        .create();

                Type type = new TypeToken<List<Menu>>() {}.getType(); //list배열안의 객체가 menu타입인지 모르기 때문에 타입을 직접적으로 명시해줘야 한다
                List<Menu> ml = new Gson().fromJson(menusStr, type);

                for (Menu m : ml) {
                    cartTotalPrice += m.getPrice();
                }

                // for (int i = 0; i < ml.size(); i++) {
                //     cartTotalPrice += ml.get(i).getPrice();
                // };
                cartCount = ml.size();

                // JSON 문자열을 Menu 객체 리스트로 변환
            // List<Object> menuList = new Gson().fromJson(menusStr, List.class);
            // cartCount = menuList.size();
            // LinkedTreeMap<String, Object> map = new LinkedTreeMap<>();
            // for (int i = 0; i < cartCount; i++) {
            //     map = (LinkedTreeMap<String, Object>) menuList.get(i);
            //     Object price = map.get("price");
            //     cartTotalPrice += (int) Double.parseDouble(String.valueOf(price));
            // }
            }
        }

        model.addAttribute("cartTotalPrice", cartTotalPrice);
        model.addAttribute("cartCount", cartCount);
        
        return "menu/list";
    }
    
    @GetMapping("detail")
    public String detail(@RequestParam("id")long id, Model model) {
        
        Menu menu = menuService.getById(id);
        model.addAttribute("menu", menu);
        return "menu/detail";
    }
    // @GetMapping("search")
    // public String search(@RequestParam("s")String search, Model model) {
    //     List<Category> category = categoryService.getList();
    //     List<MenuView> list = menuService.getSearchList(search);
    //     model.addAttribute("category",category);
    //     model.addAttribute("list", list);

    //     return "menu/list";

    // }
    
}
