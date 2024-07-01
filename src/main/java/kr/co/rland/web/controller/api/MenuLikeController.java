package kr.co.rland.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.rland.web.entity.MenuLike;
import kr.co.rland.web.service.MenuLikeService;
// 메뉴 좋아요 api요청 컨트롤러
@RestController
@RequestMapping("api/menu-likes")
public class MenuLikeController {

    @Autowired
    private MenuLikeService service;

    @PostMapping
    public MenuLike add(
        @RequestBody MenuLike menuLike){
            MenuLike newOne = service.add(menuLike);
        return newOne;
    }

    @DeleteMapping
    public String delete(Long id){
        // service.cancel()
        return null;
    }
    
}
