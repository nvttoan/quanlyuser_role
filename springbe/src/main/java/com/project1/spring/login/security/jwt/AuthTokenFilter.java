package com.project1.spring.login.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project1.spring.login.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter {
  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

  @Override // xác thực và ủy quyền người dùng
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String jwt = parseJwt(request);
      // Sử dụng phương thức parseJwt (đã được triển khai trước đó) để lấy chuỗi JWT
      // từ đối tượng HttpServletRequest.
      if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        // validate jwt và lấy username
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        // sử dụng đối tượng UserDetailsService để lấy thông tin chi tiết người dùng và
        // tạo một đối tượng UsernamePasswordAuthenticationToken để xác thực người dùng.
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
            null,
            userDetails.getAuthorities());

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
      logger.error("Cannot set user authentication: {}", e);// ghi log lỗi và tiếp tục thực hiện các bước tiếp theo.
    }

    filterChain.doFilter(request, response);// tiếp tục xử lý các yêu cầu tiếp theo trong chuỗi Filter.
  }

  private String parseJwt(HttpServletRequest request) {
    String jwt = jwtUtils.getJwtFromCookies(request);
    return jwt;// nhận jwt từ request(HttpServletRequest),phân tích và trả về chuỗi đó
  }
}
