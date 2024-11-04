package com.maverick.projectManagementSystem.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.List;

//generating new jwt token
public class JwtProvider {

    static SecretKey key = Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());

    public static String generateToken(Authentication authentication){
        Collection<? extends GrantedAuthority> grantedAuthorityList = authentication.getAuthorities();

        String jwt = Jwts.builder().setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+86400000)) //24hrs
                .claim("email", authentication.getName())
                .signWith(key)
                .compact();

        return jwt;

    }

    public static String getEmailFromToken(String jwt){
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        String email = String.valueOf(claims.get("email"));

        return email;

    }
}
