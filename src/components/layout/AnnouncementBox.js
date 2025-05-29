export default function AnnouncementBox() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-red-900 mb-2 sm:mb-3">
        🇲🇦 Tell your Morocco story
      </h2>

      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-red-800">
        <p>We love Morocco ❤️</p>
        <p>
          But there are also those times: the four-hour wait for a five-minute
          task, the paperwork that needs a copy of a copy of a stamp, and the
          taxi that claims the meter is &ldquo;on vacation.&rdquo;
        </p>

        <p>
          This board is a way to collect our stories to show there’s a distinct
          pattern of bad service interactions in this country, which is unlike
          the rest of the world.
        </p>
        <p>
          Hopefully by collecting these stories, Morocco can use them as
          feedback and improve for both foreigners and locals.
        </p>
        <div className="space-y-2">
          <p>
            <strong>Your privacy comes first.</strong> No names, no emails, no
            tracking. Ever.
          </p>
          <p>
            <strong>Your voice counts.</strong> The more stories we collect, the
            more useful this mosaic becomes, for laughs, for tips, and for
            anyone curious about how things really go down here.
          </p>
        </div>
        <p className="italic">
          So pour yourself a mint tea, settle in, and tell us: what&apos;s your
          Morocco story?
        </p>
      </div>
    </div>
  );
}
