package kr.co.rland.web.config;

import javax.sql.DataSource;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import kr.co.rland.web.config.security.WebOAuth2UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

        @Autowired
        private DataSource dataSource;

        @Autowired
        private WebOAuth2UserDetailsService webOAuth2UserDetailsService;

        @Bean
        public PasswordEncoder passwordEncoder(){
                PasswordEncoder encoder = new BCryptPasswordEncoder();
                return encoder;
        }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // 포스트 요청을 보낼때 csrf를 방지하고자 토큰을 비교하는 설정을 끈다
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/user/**").hasAnyRole("MEMBER","ADMIN") //역할별 권한설정, 멤버와 관리자 모두 접속가능
                        .requestMatchers("/admin/**").hasRole("ADMIN")//관리자만 접속가능
                        .anyRequest().permitAll())
                .formLogin((form) -> form
                        .loginPage("/user/signin")
                        .permitAll())
                .oauth2Login(config->config
                        .userInfoEndpoint(userInf->userInf
                                .userService(webOAuth2UserDetailsService)))
        .logout((logout) -> logout
        .logoutUrl("/user/logout")
        .logoutSuccessUrl("/index")
        .permitAll());

        return http.build();
    }
    //데이터베이스 쿼리를 활용해서 사용자 정보를 제공하는 제공자
//     @Bean
    public UserDetailsService jdbcUserDetailsService(){ //추가적인 인증정보를 쓸수없다 (아이디,롤 정보만 쓸수있다)
        //      -> 결과 집합의 모양
//         ┌────────────┬───────────┬─────────┐
//         │  username  │  password │ enabled │
//         ├────────────┼───────────┼─────────┤
//         │   newlec   │    111    │    1    │   
        String userSql = """
                select username, pwd password, 1 enabled from member where username=? 
                """;
        //select문은 테이블만 참조 할수 있는게 아니다 연산도 가능하다
        String authorSql = """
                SELECT m.username, mr.role_name authority FROM member m right join member_role mr on m.id = mr.member_id WHERE m.username =?
                        """;

        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        manager.setUsersByUsernameQuery(userSql);
        manager.setAuthoritiesByUsernameQuery(authorSql);
        
        return manager;
    }
// 메모리상의 사용자 정보 제공자
//     @Bean
//     public UserDetailsService userDetailsService() {
//         UserDetails user = User.builder()
//                 .username("newlec")
//                 .password("{noop}111")
//                 .roles("MEMBER", "ADMIN")
//                 .build();

//         UserDetails user2 = User.builder()
//                 .username("dragon")
//                 .password("{noop}222")
//                 .roles("MEMBER")
//                 .build();
//         return new InMemoryUserDetailsManager(user);
//     }

// ##TODO 주석 달아야함
// class AuthSuccessHandler implements AuthenticationSuccessHandler{

//         @Override
//         public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                 Authentication authentication) throws IOException, ServletException {
//             HttpSession session = request.getSession();
//             String username = authentication.getName();
//             Member member = memberRepository.findByUsername(username);
//             session.setAttribute("email", member.getEmail());
//         }
        
//     }

}
