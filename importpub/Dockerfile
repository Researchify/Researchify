FROM public.ecr.aws/lambda/python:3.8

RUN pip3 install scholarly

RUN pip3 install joblib

# Copy function code
COPY handler.py ./
COPY gscholar.py ./

RUN cd /var/lang/lib/python3.8/site-packages/scholarly && \
    sed -i '370s/()/(use_cache_server = False, verify_ssl=False)/' _proxy_generator.py

CMD [ "handler.lambda_handler" ]