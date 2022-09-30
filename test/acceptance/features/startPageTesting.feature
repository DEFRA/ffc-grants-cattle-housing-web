Feature: Test start page

    Scenario: Open start page

        Given I open the url "/cattle-housing/start"
        Then I expect that element "h1" contains the text "Check if you can apply for a Cattle Housing Grant"
        When I click on the link "Start now"
        Then I expect that the url contains "/slurry-infrastructure/applicant-type"
