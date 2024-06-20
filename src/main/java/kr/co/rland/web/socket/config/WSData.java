package kr.co.rland.web.socket.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WSData {
    private int type;
    private String userName;
    private String content;

}
