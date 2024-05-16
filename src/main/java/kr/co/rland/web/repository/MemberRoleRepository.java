package kr.co.rland.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.MemberRole;

@Mapper
public interface MemberRoleRepository {
    List<MemberRole> findAllByMemberId(Long memberId);
    
}
