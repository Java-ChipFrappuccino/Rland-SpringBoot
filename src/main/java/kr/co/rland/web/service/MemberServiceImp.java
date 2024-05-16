package kr.co.rland.web.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Member;
import kr.co.rland.web.repository.MemberRepository;

@Service
public class MemberServiceImp implements MemberService {

    @Autowired
    MemberRepository repository;
 
    @Override
    public boolean validate(String membername, String password) {
        Member member = repository.findByMembername(membername);
        if (member == null) {
            return false;
        }

        if (!member.getPwd().equals(password)) {
            return false;
        }
        return true;
    }
}
