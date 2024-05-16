package kr.co.rland.web.controller.admin;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;
import kr.co.rland.web.config.security.WebUserDetails;

@Controller("AdminHomeController") //이름의 중복을 피하기 위해 ioc컨테이너에 담기는 이름을 직접 작성해줄수있다
@RequestMapping("admin")
public class HomeController {
    
    // @ResponseBody
    @GetMapping("index")
    public String index(Model model,HttpSession session,@CookieValue(required = false) Long uid
    ,Principal principal
    ,Authentication authentication
    ,@AuthenticationPrincipal WebUserDetails userDetails) {
        // System.out.println(uid);


        // CustomUserDetails 사용방법 2
        System.out.println(userDetails.getEmail());

        
        // CustomUserDetails 사용방법 1
        // WebUserDetails userDetails = (WebUserDetails)authentication.getPrincipal();
        // System.err.println(userDetails.getEmail());

        //방법 1
        SecurityContext context = SecurityContextHolder.getContext(); // 순서대로 3중포장 구조
        Authentication auth = context.getAuthentication(); //이게 추가한 유저정보 포함 ,principal은 최소한의 정보만 담고있음 유저이름만? 사용자가 추가한 정보는 없다
        String name = auth.getName();
        System.out.println(name+"홀더에서 추출");
        // String name3 = SecurityContextHolder.getContext().getAuthentication().getName();

        String name1 = principal.getName();
        System.out.println(name1+"스프링을 통해 추출");
        

        // if (session.getAttribute("uid") == null) {
        //     return "redirect:/user/signin";
        // }
        
        model.addAttribute("m", name1);
        return "admin/index";
    }
}
