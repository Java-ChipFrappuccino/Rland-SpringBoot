package kr.co.rland.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.rland.web.config.security.WebUserDetails;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.MenuService;

//api요청 컨트롤러
@RestController("ApiMenuController")
@RequestMapping("api/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    // @ResponseBody
    @GetMapping
    public List<MenuView> list(
        @RequestParam(name = "c",required = false) Long categoryId,
        @RequestParam(name = "s",required = false) String query,
        @RequestParam(name = "p",required = false, defaultValue = "1") Integer page,
        @AuthenticationPrincipal WebUserDetails userDetails){

            Long memberId = null;
        if (userDetails != null) {
            memberId = userDetails.getId();
        }
        // List<MenuView> list = menuService.getList(1);
        List<MenuView> menus = new ArrayList<>();

        if (categoryId != null) {
            menus = menuService.getList(memberId,page,categoryId);
        } else if (query != null) {
            menus = menuService.getList(memberId,page,query);
        } else {
            menus = menuService.getList(memberId,page);
        }
        
        // try {
        //     Thread.sleep(10000);
        // } catch (InterruptedException e) {
        //     // iTODO Auto-generated catch block
        //     e.printStackTrace();
        // }

        return menus;
    }
    // 디테일 데이터 요청
    @GetMapping("1")
    public Menu get(Long id){
        return null;
    }

    // 메뉴 추가 요청
    @PostMapping
    public Menu add(Menu menu){
        return null;
    }

    // 메뉴 수정 요청
    // @PatchMapping //의미가 조금 다름
    @PutMapping
    public Menu edit(Menu menu){
        return null;
    }

    // 메뉴 삭제 요청
    @DeleteMapping
    public Menu delete(Long id){
        return null;
    }
}
