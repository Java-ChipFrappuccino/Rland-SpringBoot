package kr.co.rland.web.config.security;

import kr.co.rland.web.entity.Member;
import kr.co.rland.web.entity.MemberRole;
import kr.co.rland.web.repository.MemberRepository;
import kr.co.rland.web.repository.MemberRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class WebOAuth2UserDetailsService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest);

        System.out.println("---------------------------authorities-------------");
        System.out.println(oAuth2User.getAuthorities());
        System.out.println("---------------------------attributes-------------");
        System.out.println(oAuth2User.getAttributes());
        System.out.println("---------------------------name-------------");
        System.out.println(oAuth2User.getName());


        System.out.println("---------------------------Token-------------");
        System.out.println(userRequest.getAccessToken());
        System.out.println("---------------------------ClientRegistration-------------");
        System.out.println(userRequest.getClientRegistration().getRegistrationId());

        String email = oAuth2User.getAttribute("email");
        Member member = repository.findByEmail(email);
        String username = oAuth2User.getAttribute("name");


        WebUserDetails userDetails = new WebUserDetails();
        userDetails.setAttributes(oAuth2User.getAttributes());
//        System.out.println(oAuth2User.getAttributes()+"======================sdafkjashdksjdhfk");
//        System.out.println(name);
//        System.out.println(oAuth2User.getAttributes().get("name"));
        userDetails.setName(oAuth2User.getName());
        userDetails.setUsername(username); //그럼 구글 로그인 할떄마다 구글 attribute의 name값이 계속 덮어씌워지는건지? 아 이건 유저디테일즈의 유저네임인듯?
        // 1. 회원이 존재하지 않으면
        // 기본 정보만 담아서 반환하고
        if (member == null) { //로컬 회원으로 가입한적이 없다 ,
                                // 실패하는 경우를 먼저 적어주는게 좋다, 보통 실패할경우 리턴 한줄로 끝나기에 깔끔하다
                                // 중괄호가 커질수록 복잡해지기 때문
            return userDetails;
        }

        // -------------- security info ----------------
        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));

         for (MemberRole role : roles) {
         authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
         }


//        WebUserDetails userDetails = new WebUserDetails();
        userDetails.setId(member.getId());
        userDetails.setUsername(member.getUserName());
        userDetails.setPassword(member.getPwd());
        userDetails.setEmail(member.getEmail());
        userDetails.setAuthorities(authorities);


        return userDetails; // oAuth2User
    }
}
