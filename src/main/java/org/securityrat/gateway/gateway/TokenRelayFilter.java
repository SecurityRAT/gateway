package org.securityrat.gateway.gateway;

//import org.securityrat.gateway.security.oauth2.AuthorizationHeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty("security.oauth2.resource.user-info-uri")
public class TokenRelayFilter extends ZuulFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String TOKEN_TYPE = "Bearer";

    private final Logger log = LoggerFactory.getLogger(TokenRelayFilter.class);

    @Autowired
    private OAuth2RestTemplate oAuth2RestTemplate;

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        try {
            ctx.addZuulRequestHeader(
                AUTHORIZATION_HEADER,
                String.format("%s %s", TOKEN_TYPE, this.oAuth2RestTemplate.getAccessToken())
            );
        } catch (Exception e) {
            log.debug(
                "Exception " + e.getClass() + " for expired session for " +
                    ctx.getRequest().getRemoteUser()
            );
        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 10000;
    }
}
