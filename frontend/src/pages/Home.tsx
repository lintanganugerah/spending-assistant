import { MainPageTitle } from "./../components/MainPageTitle";
import { InformasiFinansialSection } from "../components/InformasiFinansialSection";
import { FormQuery } from "../components/FormQuery";
import { ReasonTextArea } from "../components/ReasonTextArea";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-4">
      {/* Header */}
      <MainPageTitle />

      {/* Form Section 1 */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4 mb-4">
        <FormQuery />
      </div>

      {/* Textarea Section */}
      <div className="w-full max-w-6xl space-y-8">
        <ReasonTextArea TextInformationBottom="Data akan terhapus dalam 15 menit" />
        <InformasiFinansialSection />
      </div>
    </div>
  );
}
