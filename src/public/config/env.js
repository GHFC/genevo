// The individuals interface
// Copyright (C) 2017 Institut Pasteur
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

// =========================================================================
// Configuration from environment
// This is used by the webpack DefinePlugin
// =========================================================================

module.exports = {

    // Environment
    'APP_ENV': JSON.stringify(process.env.NODE_ENV),

    // From package.json
    'APP_NAME': JSON.stringify(process.env.npm_package_name),
    'APP_VERSION': JSON.stringify(process.env.npm_package_version),
    'APP_DESCRIPTION': JSON.stringify(process.env.npm_package_description),
    'APP_CONTACT': JSON.stringify(process.env.npm_package_bugs_email)

};
