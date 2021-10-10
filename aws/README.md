# CloudFormation Configuration

This directory contains the CF template used to configure the Researchify environment. There is currently only one stack
in use:

1. **Core stack**: this stack is used for prod and includes resources such as:
    1. Elastic Beanstalk Application.
    2. Elastic Beanstalk Docker WebServer Environment.
        1. which uses a single `t2.micro` EC2 instance (i.e. not load balanced)
    3. [Instance Profile](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles-instance.html) attached
       to the EC2 instance.
    4. IAM Role attached to the Instance Profile mentioned above.
    5. Service Role for Elastic Beanstalk to enable enhanced health monitoring.
        1. For more information about the types of permissions in Elastic Beanstalk, consult the
           official [docs](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles.html).

*Note: if you'd like to specify additional configuration for the EB Environment,
see [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html)*.

## Deploying the Core stack

Example:

```shell
aws cloudformation create-stack --stack-name MY-STACK --template-body file:///path/to/core-stack.yaml --capabilities CAPABILITY_IAM --region us-east-1 [--profile <name>]
```

Ensure that the flag `--capabilities=CAPABILITY_IAM` is passed as the stack makes changes to IAM, see
the [`--capabilities` flag](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/create-stack.html#options)
for more information.

To update the stack, replace `create-stack` with `update-stack`.

## References

- https://gist.github.com/magnetikonline/c314952045eee8e8375b82bc7ec68e88
- https://aws.amazon.com/blogs/compute/configuring-cors-on-amazon-api-gateway-apis/
