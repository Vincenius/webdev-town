import React from 'react'
import Script from 'next/script'
import { TextInput, Button } from '@mantine/core';
import style from './Newsletter.module.css'

// https://stackoverflow.com/questions/50064898/how-can-i-integrate-a-mailerlite-com-signup-form-with-react

const Newsletter = () => {
  return (<><div id="mlb2-7038689" className={`${style.mlSubscribeForm} ml-form-embedContainer ml-subscribe-form ml-subscribe-form-7038689`}>
      <div className="ml-form-align-center">
        <div className="ml-form-embedWrapper embedForm">
          <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
            <div className="ml-form-embedContent">
              <p>Never miss a useful website again. Join <span className={style.textGradient}>600+</span> devs and receive a <u>weekly</u> summary straight into your inbox.</p>
            </div>
            <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/459944/forms/96558295907567305/subscribe" data-code="r2f1v0" method="post" target="_blank">
              <div className={style.mlFormContent}>
                <div className="ml-form-fieldRow ml-last-item">
                  <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                    <TextInput aria-label="email" aria-required="true" type="email" className="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autoComplete="email" />
                  </div>
                </div>
              </div>
              <div className="ml-form-embedSubmit">
                <Button type="submit" className="button">Subscribe</Button>
              </div>
              <input type="hidden" name="ml-submit" value="1"></input>
              <input type="hidden" name="anticsrf" value="true"></input>
            </form>
          </div>
          <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
            <div className="ml-form-successContent">
              <h4>Successfully subscribed!</h4>
              <p>Thanks for joining the newsletter! To receive the weekly emails, please confirm your subscription. Please check your spam folder for the confirmation email if you can't find it.</p>
            </div>
          </div>
        </div>
      </div>
      <Script>
        {`function ml_webform_success_7038689() {
          var $ = ml_jQuery || jQuery;
          $('#mlb2-7038689 .row-success').show();
          $('#mlb2-7038689 .row-form').hide();
        }`}
      </Script>
      <Script src="https://groot.mailerlite.com/js/w/webforms.min.js?v1f25ee4b05f240a833e02c19975434a4"></Script>
      <Script>
          {`fetch("https://assets.mailerlite.com/jsonp/459944/forms/96558295907567305/track-view")`}
      </Script>
    </div>
  </>)
}

export default Newsletter
