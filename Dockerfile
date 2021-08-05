FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nginx-19:1.19.2

USER appuser

COPY --chown=appuser:appuser /build /var/www

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]