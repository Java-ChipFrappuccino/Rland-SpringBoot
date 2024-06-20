package kr.co.rland.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import kr.co.rland.web.service.MemberService;

@Controller
@RequestMapping("user")
public class MemberController {

    @Autowired
    private MemberService service;
    
    // @ResponseBody
    @GetMapping("signin")
    public String signin() {

        return "user/signin";
    }

    @GetMapping("signup")
    public String signup() {

        return "user/signup";
    }

    // @PostMapping("signin")
    public String signin(String username,String password,HttpSession session,HttpServletResponse response) {

        boolean valid = service.validate(username,password);

        if (!valid) {
            return "redirect:signin?error";
        } 

        Cookie uidCookie = new Cookie("uid","1");
        uidCookie.setPath("/");
        // uidCookie.setMaxAge(0);
        // uidCookie.setSecure(false);
        uidCookie.setHttpOnly(true);

        Cookie membernameCookie = new Cookie("membername",username);
        membernameCookie.setPath("/");

        response.addCookie(uidCookie);
        response.addCookie(membernameCookie);


        // session.setAttribute("uid", "1");
        // session.setAttribute("membername", "newlec");
        return "redirect:/index";
    }
}
