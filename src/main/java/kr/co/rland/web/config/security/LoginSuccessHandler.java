package kr.co.rland.web.config.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final HttpSession httpSession;
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy(); // url인코딩을 자동으로 해주는 유틸? 리다이렉트 해주는거

    public LoginSuccessHandler(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String url = "/";

        WebUserDetails userDetails = (WebUserDetails) authentication.getPrincipal();
        if (userDetails.getAuthorities() == null || userDetails.getAuthorities().isEmpty()) {
//            request.logout();
//            SecurityContextHolder.clearContext();
//            HttpSession session = request.getSession(false);
//            if (session != null) {
//                session.invalidate();
//            }

            url = "/user/signup";
        }
//        else if () {
//            url = "/admin/index";
//        }
        redirectStrategy.sendRedirect(request, response, url);
    }

}
