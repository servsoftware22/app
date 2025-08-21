import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export default function Footer({
  palette,
  businessName = "Business",
  websiteData,
}) {
  // Ensure palette exists before rendering
  if (!palette) {
    console.warn("No palette provided to Footer component");
    return null;
  }

  // Extract business info and header config from websiteData
  const businessInfo = websiteData?.business_info || {};
  const address = businessInfo.address || {};
  const headerConfig = websiteData?.header || {};
  const footerConfig = websiteData?.footer || {};

  // Get logo text from header config or fallback to business name
  const logoText =
    headerConfig?.logo?.text || businessInfo.name || businessName;
  const logoType = headerConfig?.logo?.type || "text";
  const logoImageUrl = headerConfig?.logo?.image_url;

  // Get navigation links from header config
  const navLinks =
    headerConfig?.nav_links?.filter((link) => link.visible) || [];

  // Get footer description and social links
  const footerDescription =
    footerConfig?.description ||
    `Professional ${
      businessInfo.type?.toLowerCase() || "services"
    } with a commitment to quality, reliability, and customer satisfaction.`;
  const socialLinks = footerConfig?.socialLinks || [];

  return (
    <footer
      className="py-20 px-8 lg:px-16"
      style={{ backgroundColor: palette.primary }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-8">
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center mr-4"
                style={{ backgroundColor: palette.neutral }}
              >
                {logoType === "image" && logoImageUrl ? (
                  <img
                    src={logoImageUrl}
                    alt={logoText}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span
                    className="text-xl font-light urban-font"
                    style={{ color: palette.primary }}
                  >
                    {logoText.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3
                className="text-2xl font-medium urban-font"
                style={{ color: palette.neutral }}
              >
                {logoText}
              </h3>
            </div>
            <p
              className="text-lg font-extralight urban-font mb-8 max-w-md"
              style={{ color: palette.neutral }}
            >
              {footerDescription}
            </p>
            <div className="flex space-x-6">
              {socialLinks.length > 0 ? (
                socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity duration-300 hover:opacity-80"
                  >
                    {social.icon === "whatsapp" && (
                      <img
                        src="https://toolpage.site/apps/whatsapp.png"
                        alt="WhatsApp"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "facebook" && (
                      <img
                        src="https://toolpage.site/apps/facebook.png"
                        alt="Facebook"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "instagram" && (
                      <img
                        src="https://toolpage.site/apps/instagram.png"
                        alt="Instagram"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "twitter" && (
                      <img
                        src="https://toolpage.site/apps/twitter.png"
                        alt="Twitter"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "linkedin" && (
                      <img
                        src="https://toolpage.site/apps/linkedin.png"
                        alt="LinkedIn"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "youtube" && (
                      <img
                        src="https://toolpage.site/apps/youtube.png"
                        alt="YouTube"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "tiktok" && (
                      <img
                        src="https://toolpage.site/apps/tiktok.png"
                        alt="TikTok"
                        className="w-6 h-6"
                      />
                    )}
                    {social.icon === "mail" && (
                      <Mail
                        className="w-6 h-6"
                        style={{ color: palette.neutral }}
                      />
                    )}
                    {social.icon === "phone" && (
                      <Phone
                        className="w-6 h-6"
                        style={{ color: palette.neutral }}
                      />
                    )}
                    {social.icon === "message" && (
                      <MessageCircle
                        className="w-6 h-6"
                        style={{ color: palette.neutral }}
                      />
                    )}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href={`mailto:${businessInfo.email || "#"}`}
                    className="transition-opacity duration-300 hover:opacity-80"
                  >
                    <Mail
                      className="w-6 h-6"
                      style={{ color: palette.neutral }}
                    />
                  </a>
                  <a
                    href={`tel:${businessInfo.phone || "#"}`}
                    className="transition-opacity duration-300 hover:opacity-80"
                  >
                    <Phone
                      className="w-6 h-6"
                      style={{ color: palette.neutral }}
                    />
                  </a>
                  <a
                    href="contact"
                    className="transition-opacity duration-300 hover:opacity-80"
                  >
                    <MessageCircle
                      className="w-6 h-6"
                      style={{ color: palette.neutral }}
                    />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xl font-medium urban-font mb-8"
              style={{ color: palette.neutral }}
            >
              {footerConfig.quickLinks?.title || "Quick Links"}
            </h4>
            <ul className="space-y-4">
              {navLinks.length > 0 ? (
                navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="urban-footer-nav-link"
                      style={{ color: palette.neutral }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a
                      href="./"
                      className="urban-footer-nav-link"
                      style={{ color: palette.neutral }}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="services"
                      className="urban-footer-nav-link"
                      style={{ color: palette.neutral }}
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="about"
                      className="urban-footer-nav-link"
                      style={{ color: palette.neutral }}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="contact"
                      className="urban-footer-nav-link"
                      style={{ color: palette.neutral }}
                    >
                      Contact
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-xl font-medium urban-font mb-8"
              style={{ color: palette.neutral }}
            >
              {footerConfig.contactInfo?.title || "Contact Info"}
            </h4>
            <ul className="space-y-4">
              {address.isPublic && (
                <li className="flex items-start">
                  <MapPin
                    className="w-6 h-6 mr-4 mt-0.5"
                    style={{ color: palette.neutral }}
                  />
                  <span
                    className="text-lg font-light urban-font"
                    style={{ color: palette.neutral }}
                  >
                    {address.street}
                    {address.unit && ` ${address.unit}`}
                    <br />
                    {address.city}, {address.state} {address.zip}
                  </span>
                </li>
              )}
              {businessInfo.phone && (
                <li className="flex items-start">
                  <Phone
                    className="w-6 h-6 mr-4 mt-0.5"
                    style={{ color: palette.neutral }}
                  />
                  <span
                    className="text-lg font-light urban-font"
                    style={{ color: palette.neutral }}
                  >
                    {businessInfo.phone}
                  </span>
                </li>
              )}
              {businessInfo.email && (
                <li className="flex items-start">
                  <Mail
                    className="w-6 h-6 mr-4 mt-0.5"
                    style={{ color: palette.neutral }}
                  />
                  <span
                    className="text-lg font-light urban-font"
                    style={{ color: palette.neutral }}
                  >
                    {businessInfo.email}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t mt-16 pt-10"
          style={{ borderColor: palette.neutral }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-base font-light urban-font mb-4 md:mb-0"
              style={{ color: palette.neutral }}
            >
              © {new Date().getFullYear()} {logoText}. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {footerConfig.bottomLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-base font-light urban-font transition-colors duration-300 hover:opacity-80"
                  style={{ color: palette.neutral }}
                >
                  {link.text}
                </a>
              )) || (
                <>
                  <a
                    href="terms"
                    className="text-base font-light urban-font transition-colors duration-300 hover:opacity-80"
                    style={{ color: palette.neutral }}
                  >
                    Terms of Service
                  </a>
                  <a
                    href="privacy"
                    className="text-base font-light urban-font transition-colors duration-300 hover:opacity-80"
                    style={{ color: palette.neutral }}
                  >
                    Privacy Policy
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
