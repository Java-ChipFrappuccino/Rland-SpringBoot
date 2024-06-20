package kr.co.rland.web.socket.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WSUser {
    private String username;
    private WebSocketSession session;

}
