package kr.co.rland.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuLike {
    private Long memberId;
    private Long menuId;
    private LocalDateTime regDate;
}
