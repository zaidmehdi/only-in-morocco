export default function AnnouncementBox() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-red-900 mb-3">
        Tell your 🇲🇦 Morocco story
      </h2>

      <div className="space-y-4 text-sm text-red-800">
        <p>
          We love the first whiff of sizzling sardines, the café buzz on every
          corner, and that moment when the Atlas mountains peek through the
          clouds. ❤️
        </p>
        <p>
          But there are also those times: the four-hour wait for a five-minute
          task, the paperwork that needs a copy of a copy of a stamp, and the
          taxi that claims the meter is "on vacation." We have laughed,
          face-palmed, and heard the classic line, "Relax, it’s part of the
          adventure."
        </p>
        <p>
          That is why we built this spot: a comfy, anonymous place to swap the
          good, the bad, and the “you won’t believe this” moments of life in
          Morocco. Stack them all together and we might see what works, what
          does not, and what needs a gentle nudge.
        </p>

        <div className="space-y-2">
          <p>
            <strong>Your privacy comes first.</strong> No names, no emails, no
            tracking. Ever.
          </p>
          <p>
            <strong>Your voice counts.</strong> The more stories we collect, the
            more useful this mosaic becomes— for laughs, for tips, and for
            anyone curious about how things really go down here.
          </p>
        </div>
        <p className="italic">
          So pour yourself a mint tea, settle in, and tell us: what’s your
          Morocco story?
        </p>
      </div>
    </div>
  );
}
