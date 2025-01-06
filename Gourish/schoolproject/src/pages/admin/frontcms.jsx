

import React, { useState } from 'react';

const App = () => {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [footerText, setFooterText] = useState('');
  const [cookieConsent, setCookieConsent] = useState(false);
  const [googleAnalytics, setGoogleAnalytics] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [googlePlusUrl, setGooglePlusUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [pinterestUrl, setPinterestUrl] = useState('');
  const [currentTheme, setCurrentTheme] = useState('default');
  const [frontCms, setFrontCms] = useState(true); // State for Front CMS toggle
  const [newsOption, setNewsOption] = useState(false);
  const [complainOption, setComplainOption] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // Update the selected language
  };


  const handleFaviconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFavicon(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 shadow-md">
      <div className="flex space-x-10">
          {/* Left Section */}
          <div className="w-3/4 p-6 space-y-6">
          <h2 className="text-xl font-bold mb-6">Front CMS Setting</h2>

            {/* Front CMS Toggle */}
            <div className="flex items-center mb-4 space-x-40">
            <label className="ml-2 text-lg">Front CMS</label>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={frontCms}
                onChange={() => setFrontCms(!frontCms)}
              />
              
            </div>
             {/* Front CMS Toggle */}
             <div className="flex items-center mb-4 space-x-40">
            <label className="ml-2 text-lg">Sidebar</label>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={frontCms}
                onChange={() => setFrontCms(!frontCms)}
              />
              
            </div>
             {/* Front CMS Toggle */}
             <div className="flex items-center mb-4 space-x-8">
            <label className="ml-2 text-lg">Language RTL Text Mode</label>
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={frontCms}
                onChange={() => setFrontCms(!frontCms)}
              />
              
            </div>
                    {/* Sidebar Option */}
        <div className="flex mb-6 space-x-10">
        <label className="ml-2 text-lg">Sidebar Option</label>

          {/* News Checkbox */}
          <div className="flex items-center space-x-2">
            <label className="ml-2 text-lg">News</label>
            <input
              type="checkbox"
              className="checkbox checkbox-success dark:bg-gray-800"
              checked={newsOption}
              onChange={() => setNewsOption(!newsOption)}
            />
          </div>

          {/* Complain Checkbox */}
          <div className="flex items-center space-x-2">
            <label className="ml-2 text-lg">Complain</label>
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              checked={complainOption}
              onChange={() => setComplainOption(!complainOption)}
            />
          </div>
        </div>
            {/* Language Filter Dropdown */}
        <div className="mb-6">
          <label className="text-lg font-semibold mb-2 block dark:bg-gray-800">Language</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-1/2 p-2 border border-gray-300 rounded-md dark:bg-gray-800"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            
            {/* Add more languages as needed */}
          </select>
        </div>
            {/* Logo Upload Section */}
            <div>
              <label className="block text-lg font-semibold mb-2">Logo (369px X 76px)</label>
              {logo ? (
                <div className="relative">
                  <img src={logo} alt="Logo" className="w-full h-auto border rounded-md mb-4" />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => setLogo(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <label className="cursor-pointer text-blue-500 hover:underline">
                    Drag and drop a file here or click
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Favicon Upload Section */}
            <div>
              <label className="block text-lg font-semibold mb-2">Favicon (32px X 32px)</label>
              {favicon ? (
                <div className="relative">
                  <img src={favicon} alt="Favicon" className="w-full h-auto border rounded-md mb-4" />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => setFavicon(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <label className="cursor-pointer text-blue-500 hover:underline">
                    Drag and drop a file here or click
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFaviconUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Footer Text Section */}
            <div>
              <label className="block text-lg font-semibold mb-2">Footer Text</label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                placeholder="Enter footer text"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 ">Cookie Consent</label>
              <input
                type="text"
                value={googleAnalytics}
                onChange={(e) => setGoogleAnalytics(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Google Analytics</label>
              <input
                type="text"
                value={googleAnalytics}
                onChange={(e) => setGoogleAnalytics(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                placeholder="Enter Google Analytics ID"
              />
            </div>
            {/* Current Theme */}
            <div>
              <label className="block text-lg font-semibold mb-2">Current Theme</label>
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
              >
                <option value="default">default</option>
                <option value="yellow">yellow</option>
                <option value="darkgray">darkgray</option>
                <option value="bold_blue">bold_blue</option>
                <option value="shadow_white">shadow_white</option>
                <option value="material_pink">material_pink</option>
              </select>
            </div>
          </div>
          

          {/* Right Section */}
          <div className="w-1/4 p-6 space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Social Media URLs</label>
              <div>
                <label className="block text-sm">WhatsApp URL</label>
                <input
                  type="text"
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter WhatsApp URL"
                />
              </div>
              <div>
                <label className="block text-sm">Facebook URL</label>
                <input
                  type="text"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter Facebook URL"
                />
              </div>
              <div>
                <label className="block text-sm">Twitter URL</label>
                <input
                  type="text"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 bg-text-white dark:bg-gray-800 rounded-md"
                  placeholder="Enter Twitter URL"
                />
              </div>
              <div>
                <label className="block text-sm">Youtube URL</label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter YouTube URL"
                />
              </div>
              <div>
                <label className="block text-sm">Google Plus URL</label>
                <input
                  type="text"
                  value={googlePlusUrl}
                  onChange={(e) => setGooglePlusUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter Google Plus URL"
                />
              </div>
              <div>
                <label className="block text-sm">LinkedIn URL</label>
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter LinkedIn URL"
                />
              </div>
              <div>
                <label className="block text-sm">Instagram URL</label>
                <input
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter Instagram URL"
                />
              </div>
              <div>
                <label className="block text-sm">Pinterest URL</label>
                <input
                  type="text"
                  value={pinterestUrl}
                  onChange={(e) => setPinterestUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800"
                  placeholder="Enter Pinterest URL"
                />
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


