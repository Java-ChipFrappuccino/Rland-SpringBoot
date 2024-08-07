package kr.co.rland.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Menu {

    private long id;
	private String korName;
	private String engName;
	private int price;
	private String img;
	private Date regDate;
	private Long categoryId;
	private Long likeCount;
	private Long regMemberId;

}
