from rauth import OAuth2Service
from flask import current_app, url_for, request, redirect
import json


class OAuthSignIn(object):
    providers = None

    def __init__(self, provider_name):
        self.provider_name = provider_name
        credentials = current_app.config['OAUTH_CREDENTIALS'][provider_name]
        self.consumer_id = credentials['id']
        self.consumer_secret = credentials['secret']

    def authorize(self):
        pass

    def callback(self):
        pass

    def get_callback_url(self):
        return url_for('oauth_callback', provider=self.provider_name,
                       _external=True)

    @classmethod
    def get_provider(self, provider_name):
        if self.providers is None:
            self.providers = {}
            for provider_class in self.__subclasses__():
                provider = provider_class()
                self.providers[provider.provider_name] = provider
        return self.providers[provider_name]


class LinkedinSignIn(OAuthSignIn):
    def __init__(self):
        super(LinkedinSignIn, self).__init__('linkedin')
        self.service = OAuth2Service(
            name='linkedin',
            client_id=self.consumer_id,
            client_secret=self.consumer_secret,
            authorize_url='https://www.linkedin.com/oauth/v2/authorization',
            access_token_url='https://www.linkedin.com/oauth/v2/accessToken',
            base_url='https://api.linkedin.com'
        )

    def authorize(self):
        return redirect(self.service.get_authorize_url(
            response_type='code',
            redirect_uri=self.get_callback_url())
        )

    def callback(self):
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()},
            decoder=json.loads
        )
        url = '/v1/people/~:(id,firstName,lastName,emailAddress)?format=json'
        me = oauth_session.get(url).json()
        if 'id' not in me:
            return None, None, None
        return 'linkedin$' + me['id'], \
               me['firstName'] + " " + me['lastName'], \
               me['emailAddress']
