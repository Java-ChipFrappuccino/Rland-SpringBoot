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
        // 커밋 수정 테스트
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

    @GetMapping("1")
    public Menu get(Long id){
        return null;
    }

    @PostMapping
    public Menu add(Menu menu){
        return null;
    }

    // @PatchMapping //의미가 조금 다름
    @PutMapping
    public Menu edit(Menu menu){
        return null;
    }

    @DeleteMapping
    public Menu delete(Long id){
        return null;
    }
}
